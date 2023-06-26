import { prisma } from "~/db.server";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";
const options = {
  silent: false,
  headerIds: false, baseUrl: false, throwOnError: false, output: "mathml",mangle: false,
}
const katex = "katex: $c = \\pm\\sqrt{a^2 + b^2}$"
function Post({ title, slug, markdown="" }) {
  const text = markdown?.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "") 
  const context = Object.assign(this, {
    title,
    slug,
    markdown,
    html: marked
      .use(markedKatex(options))
      .parse(text, options),
  });
}

const initMany = async (args) => args.map((post) => new Post(post));

const init = async (post) => new Post(post);

export const getPosts = async () => prisma.post.findMany().then(initMany);

export const getPost = async (slug) =>
  prisma.post.findUnique({ where: { slug } }).then(init);

export const createPost = async (post) => prisma.post.create({ data: post });
