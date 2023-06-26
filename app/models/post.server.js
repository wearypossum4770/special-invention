function Post({ title, slug }) {
  const context = Object.assign(this, { title, slug });
}
import { prisma } from "~/db.server";

const initMany = async (args) => args.map((post) => new Post(post));
const init = async (post) => new Post(post);
export const getPosts = async () => prisma.post.findMany().then(initMany);

export const getPost = async (slug) =>
  prisma.post.findUnique({ where: { slug } }).then(init);

export const createPost = async (post) =>
  prisma.post.create({ data: post });
