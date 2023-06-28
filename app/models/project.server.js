import { prisma } from "~/db.server";

function Project({
  favourite,
  projectType,
  title,
  description,
  id,
  name,
  type,
  subtitle,
}) {
  const context = Object.assign(this, {
    favourite,
    projectType,
    title,
    description,
    id,
    subtitle,
    name,
    type,
  });
}
export const findProject = (id) => prisma.project.findUnique({ where: { id } });

export const getProjects = async () => prisma.project.findMany();
