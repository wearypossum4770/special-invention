import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation, } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost } from "~/models/post.server";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;
export const action = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1_000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  console.log(markdown.constructor)
  invariant(
    typeof title === "string",
    "title must be a string"
  );
  invariant(
    typeof slug === "string",
    "slug must be a string"
  );
  invariant(
    typeof markdown === "string",
    "markdown must be a string"
  );
  const errors = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) return json(errors);
  console.log({ title, slug, markdown })
  await createPost({ title, slug, markdown });

  return redirect("/posts/admin");
};
export default function NewPost() {
  const errors = useActionData();
  const navigation = useNavigation();
  const isCreating = Boolean(
    navigation.state === "submitting"
  );
  return (
    <Form className="blog-new-post-form" method="post">
      <p className="form-group">
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
        </label>
        {errors?.title && <em className="error-message">{errors.title}</em>}
      </p>
      <p className="form-group">
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
        </label>
        {errors?.slug && <em className="error-message">{errors.slug}</em>}

      </p>
      <p className="form-group">
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {errors?.markdown && <em className="error-message">{errors.markdown}</em>}

      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isCreating}
        >
          {isCreating ? 'Creating...': 'Create Post'}
        </button>
      </p>
    </Form>
  );
}
