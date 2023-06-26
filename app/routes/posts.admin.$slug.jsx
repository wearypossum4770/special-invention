import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";
export const loader = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);
  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);
  const html = marked.parse(post.markdown, { mangle: false, headerIds: false });
  return json({ post, html });
};

const AdminPostSlug = () => {}

export default AdminPostSlug;