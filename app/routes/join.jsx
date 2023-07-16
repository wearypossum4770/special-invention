import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
const usermodel = [
  {
    label: "email address",
    type: null,
    required: false,
    get id() {
      return this.autoComplete;
    },
    name: "email",
    get autoComplete() {
      return this.name;
    },
  },
  {
    label: "username",
    type: null,
    name: "username",
    required: false,
    get id() {
      return this.autoComplete;
    },
    get autoComplete() {
      return this.name;
    },
  },
  {
    label: "first name:",
    type: null,
    required: false,
    get id() {
      return this.autoComplete;
    },
    name: "firstName",
    autoComplete: "given-name",
  },
  {
    label: "middle name:",
    type: null,
    required: false,
    get id() {
      return this.autoComplete;
    },
    name: "middleName",
    autoComplete: "additional-name",
  },
  {
    label: "last name:",
    type: null,
    required: false,
    get id() {
      return this.autoComplete;
    },
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
  const fields = usermodel.map((field) => ({
    [field.name]: formData.get(field.name),
  }));

  const email = formData.get("email");
  const password = formData.get("password");
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
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData();
  const refs = usermodel.reduce(
    (a, c) => Object.assign(a, { [c.name]: useRef(null) }),
    {}
  );
  refs.usernameIsEmail = useRef(false);

  const markUsernameAsEmail = () =>
    (refs.username.current.value = refs.email.current.value);

  useEffect(() => {
    if (actionData?.errors?.email) {
      refs.emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      refs.passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          {usermodel.map((field) => (
            <div>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                ref={refs[field.name]}
                name={field.name}
                aria-invalid={
                  actionData?.errors?.[field.name] ? true : undefined
                }
                aria-describedby={`${field.id}-error`}
                type={field.type}
                required={field.required}
                id={field.id}
                key={field.id}
                autoComplete={field.autoComplete}
              />
              {field.name === "username" ? (
                <small >
                  {" "}
                  <label htmlFor="username-is-email">
                    Use email for username
                  </label>
                  <input
                  
                    type="checkbox"
                    name="usernameIsEmail"
                    onChange={markUsernameAsEmail}
                  />
                </small>
              ) : null}
              {actionData?.errors?.[field.name] && (
                <span>{actionData?.errors?.[field.name]}</span>
              )}
            </div>
          ))}
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
           
          >
            Create Account
          </button>
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
      </div>
    </div>
  );
}
