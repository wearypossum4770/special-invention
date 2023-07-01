import { PrismaClient } from "@prisma/client";
import users from "./source/users.json" assert { type: "json" };
// import bcrypt from 'bcrypt'
// import argon2 from 'argon2'

// const bcryptPasswordHasher = async (cleartextPassword: String, saltRounds: Number) => {
//     bcrypt.genSalt(saltRounds, function(err: Error, salt: String) {
//         if (err) return err
//         return bcrypt.hash(cleartextPassword, salt, function(err: Error, hash: String) {
//             if (err) return err
//             return { salt, hash, saltRounds }
//         });
//     });
// }
// const bcryptToArgon2 = async (hashedPassword: String, cleartextPassword: String) => {
//     if (hashedPassword.startsWith('$2a$') || hashedPassword.startsWith('$2b$')) {
//         return bcrypt.compare(cleartextPassword, hashedPassword, (err: Error, result: Boolean) => {
//             if (err) return err
//             if (result) return argonPasswordHasher(cleartextPassword)
//             else return null;
//         });
//     }
// }
async function argonPasswordHasher(cleartextPassword: String) {}
async function init() {
  const prisma = new PrismaClient();

  for (let u = 0; u < users.length; u++) {
    const {
      username,
      firstName,
      middleName,
      lastName,
      email,
      password,
      createdAt,
    } = users[u];
    prisma.user.create({
      data: {
        username,
        firstName,
        middleName,
        lastName,
        email,
        password,
        createdAt,
      },
    });
  }
}
