import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

import { prisma } from "~/db.server";

export const identityList = async () => prisma.anonymousUser.findMany();
export const identityExists = async ({ anonymousId }) =>
  prisma.findUnique({ where: { id: anonymousId } });
export const identify = async ({ anonymousId, idempotentId }) =>
  prisma.anonymousUser.create({
    data: {
      idempotentId: idempotentId ? idempotentId : randomUUID(),
      id: anonymousId ? anonymousId : randomUUID(),  
    }
  });
export const getUserById = async (id) =>
  prisma.user.findUnique({ where: { id } });

export const getUserByEmail = async (email) =>
  prisma.user.findUnique({ where: { email } });

const hashedPassword = ({ password }) => bcrypt.hash(password, 10);

export const createUser = async (email, password) =>
  prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: await hashedPassword({ password }),
        },
      },
    },
  });

export const deleteUserByEmail = async (email) =>
  prisma.user.delete({ where: { email } });

export async function verifyLogin(email, password) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
