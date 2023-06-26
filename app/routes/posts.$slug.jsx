import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";
export const loader = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);
  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);
  const markdown =
    post.markdown?.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "") ??
    "katex: $c = \\pm\\sqrt{a^2 + b^2}$\n\n| spanned header ||\n|----|----|\n|cell 1|cell 2|";
  const html = marked.parse(markdown, { mangle: false, headerIds: false });
  return json({ post, html });
};

const PostSlug = () => {
  const { post, html } = useLoaderData();
  return (
    <main>
      <h1>{post.title}</h1>
      <div id="markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
};
export default PostSlug;
