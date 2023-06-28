import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const passwordHasherBcrypt = async (rawPassword: string, saltRounds: number) =>
  Promise.resolve(bcrypt.hash(rawPassword, saltRounds));

const prisma = new PrismaClient()
  /***********************************/
  /* USER FULL NAME MIDDLEWARE */
  /***********************************/
  .$extends({
    result: {
      user: {
        fullName: {
          needs: { firstName: true, middleName: true, lastName: true },
          compute({ firstName, middleName, lastName}) {
            return `${firstName} ${
              middleName ? middleName : ""
            }.${lastName}`;
          },
        },
      },
    },
  })
  /***********************************/
  /* FRIENDLY DISPLAYNAME MIDDLEWARE */
  /***********************************/

  .$extends({
    result: {
      user: {
        displayName: {
          needs: { fullName: true, email: true },
          compute({ fullName, email}) {
            return `${fullName} <${email}>`;
          },
        },
      },
    },
  })
    /***********************************/
  /* OBFUSCATE PASSWORD MIDDLEWARE */
  /***********************************/
  .$extends({

  })
  /***********************************/
  /* OBFUSCATE PASSWORD MIDDLEWARE */
  /***********************************/
  .$extends({
    result: {
      user: {
        password: {
          needs: {},
          compute() {
            return undefined;
          },
        },
      },
    },
  })
async function main() {
  /**
   * Example query containing the `fullName` computed field in the response
   */
  const users = await prisma.user.findMany({ take: 5 });

  for (const user of users) {
    console.info(`- ${user.displayName}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
