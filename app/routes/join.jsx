import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
const usermodel = [
  {
    disabled: false,
    placeholder: '',
    hidden: false,
    enterKeyHint: 'next',
    label: "Email Address",
    type: 'email',
    required: false,
    key: 1,
    id: 'email-address',
    name: "email",
    get autoComplete() {
      return this.name;
    },
  },
  {
    disabled: false,
    placeholder: '',
    hidden: false,
    enterKeyHint: 'next',
    label: "Username",
    type: "email",
    name: "username",
    required: false,
    key: 2,
    id: 'username',
    get autoComplete() {
      return this.name;
    },
  },
  {
    disabled: false,
    placeholder: "",
    type: 'password',
    autoComplete: 'new-password',
    required: true,
    enterKeyHint: 'next',
    id:'new-password',
    key: 3,
    name: 'password',
    label: "Password",
    hidden: false,
  },
  {
    disabled: false,
    placeholder: '',
    hidden: false,
    enterKeyHint: 'next',
    label: "Confirm password",
    type: 'password',
    required: false,
    key: 4,
    id: 'confirm-new-password',
    name: "passwordConfirmation",
    autoComplete: 'new-password',
  },
  {
    disabled: false,
    placeholder: '',
    hidden: false,
    enterKeyHint: 'next',
    label: "First Name:",
    type: null,
    required: false,
    key: 5,
    id: 'first-name',
    name: "firstName",
    autoComplete: "given-name",
  },
  {
    disabled: false,
    placeholder: '',
    hidden: false,
    enterKeyHint: 'next',
    label: "Middle Name:",
    type: null,
    required: false,
    key: 6,
    id: 'middle-name',
    name: "middleName",
    autoComplete: "additional-name",
  },
  {
    disabled: false,
    placeholder: '',
    hidden: false,
    enterKeyHint: 'next',
    label: "Last Name:",
    type: null,
    required: false,
    key: 7,
    id: 'last-name',
    name: "lastName",
    autoComplete: "family-name",
  },
];

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { email,
    username,
    firstName,
    middleName,
    lastName,password,...args} = usermodel.reduce((accum, field) =>  Object.assign(accum, {[field.name]:formData.get(field.name)}),{});
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
          username: null,
          firstName: null,
          middleName: null,
          lastName: null,
        },
      },
      { status: 403 }
    );
  }
  const user = await createUser({
    email,
    username,
    firstName,
    middleName,
    lastName,
    password
  });

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta = () => [{ title: "Sign Up" }];
const sendToAnalytics = async ({ target: { autoComplete, ...args}, ...rest}) => {
  console.log({autoComplete, ...args, ...rest})
}
export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData();
  const refs = usermodel.reduce(
    (a, c) => Object.assign(a, { [c.name]: useRef(null) }),
    {}
  );
  refs.usernameIsEmail = useRef(false);
  const copyEmail = async (value) => {
    if (value !== 'username') return value
    if (refs.usernameIsEmail.current) {
      refs.username.current.value = refs.email.current.value;
      return value
    }
  };


  const preventValidation = ({ target }) => target.setCustomValidity('')   
  const handleMarkUsernameAsEmail = (event) => {
    unmarkUsernameAsEmail(event);
    markUsernameAsEmail(event);
  };
  const unmarkUsernameAsEmail = ({ target: { checked } }) =>
    (refs.username.current.value = "");
  const markUsernameAsEmail = ({ target: { checked } }) =>
    (refs.usernameIsEmail.current = checked);

  useEffect(() => {
    if (actionData?.errors?.email) {
      refs.email.current?.focus();
    } else if (actionData?.errors?.password) {
      refs.password.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post" className="main-login-form">
      {usermodel.map((field) => (
        <div className="form-group" key={field.key}>
          <label className="form-group-label" htmlFor={field.id}>
            {field.label}
          </label>
          <input
            className="form-group-input"
            ref={refs[field.name]}
            name={field.name}
            defaultValue={field.value}
            aria-invalid={actionData?.errors?.[field.name] ? true : undefined}
            aria-describedby={`${field.id}-error`}
            type={field.type}
            required={field.required}
            id={field.id}
            onBlur={()=> sendToAnalytics && copyEmail('username')}
            onFocus={()=> sendToAnalytics && copyEmail('username')}
            autoComplete={field.autoComplete}
          />
          {field.name === "username" ? (
            <small>
              {" "}
              <label htmlFor="username-is-email">Use email for username</label>
              <input
                id="username-is-email"
                onInvalid={preventValidation}
                type="checkbox"
                name="usernameIsEmail"
                onChange={handleMarkUsernameAsEmail}
              />
            </small>
          ) : null}
          {actionData?.errors?.[field.name] && (
            <span>{actionData?.errors?.[field.name]}</span>
          )}
        </div>
      ))}
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <button type="submit">Create Account</button>
      <div>
        <div>
          Already have an account?{" "}
          <Link
            to={{
              pathname: "/login",
              search: searchParams.toString(),
            }}
          >
            Log in
          </Link>
        </div>
      </div>
    </Form>
  );
}
