import { prisma } from "~/db.server";

export const getPageView = () => prisma.pageView.findMany();
export const createPageView = (pageview) =>
  prisma.pageView.create({ data: pageview });
