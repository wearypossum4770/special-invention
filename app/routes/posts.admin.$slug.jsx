import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { createPost, getPost } from "~/models/post.server";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

export const loader = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);
  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);
  const html = marked.parse(post.markdown, { mangle: false, headerIds: false });
  return json({ post, html });
};

export const action = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1_000));

  const formData = await request.formData();

  const { title, slug, markdown, html } = [
    "title",
    "slug",
    "markdown",
    "html",
  ].reduce((a, field) => ({ ...a, [field]: formData.get(field) ?? "" }), {});

  invariant(title.constructor.name === "String", "title must be a string");
  invariant(slug.constructor.name === "String", "slug must be a string");
  invariant(
    markdown.constructor.name === "String",
    "markdown must be a string"
  );
  const errors = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) return json(errors);
  console.log({ title, slug, markdown });
  await createPost({ title, slug, markdown, html });

  return redirect("/posts/admin");
};

const AdminPostSlug = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const { post, html } = useLoaderData();
  const isCreating = Boolean(navigation.state === "submitting");
  return (
    <div class="blog-new-post">
      <div
        className="blog-new-post-markdown"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <Form className="blog-new-post-form" method="post">
        <p className="form-group">
          <label>
            Post Title:{" "}
            <input type="text" name="title" defaultValue={post.title} />
          </label>
          {errors?.title && <em className="error-message">{errors.title}</em>}
        </p>
        <p className="form-group">
          <label>
            Post Slug:{" "}
            <input type="text" name="slug" defaultValue={post.slug} />
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
            defaultValue={post.markdown}
          />
          {errors?.markdown && <em className="error-message">{errors.html}</em>}
        </p>
        <p className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
            disabled={isCreating}
          >
            {isCreating ? "Saving..." : "Save Post"}
          </button>
        </p>
      </Form>
    </div>
  );
};

export default AdminPostSlug;
