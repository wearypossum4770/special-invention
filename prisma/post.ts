import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    post: {
      isPublished: {
        needs: { publishedAt: true },
        compute({ publishedAt }) {
          return publishedAt && !!publishedAt;
        },
      },
    },
  },
});

async function main() {
  /**
   * Example query containing the `fullName` computed field in the response
   */
  const user = await prisma.post.findFirst();
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
