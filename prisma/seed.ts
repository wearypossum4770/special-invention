import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();



const first = {
  get email() {
    return `${this.username}@example.com`;
  },
  get middleInitial() {return this.middleName ? this.middleName[0] : ""},
  get username() {
    return `${this.firstName}.${this.middleInitial}.${this.lastName}`;
  },
  firstName: "john",
  middleName: "daniel",
  lastName: "doe",
  password: "password1",
};
async function main() {
  // https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware#step-1-store-status-of-record
  
  /***********************************/
  /* SOFT DELETE MIDDLEWARE */
  /***********************************/  
  prisma.$use(async (params, next: Function) => {
    if (params.action == 'delete' && process.env.NODE_ENV === 'production') {
      Object.assign(params, { action: 'update', [params.args['data']]: { deletedAt: Date.now() } })
    }
    if (params.action == 'deleteMany' && process.env.NODE_ENV === 'production' && params.args.data != undefined) {
      Object.assign(params, { action: 'updateMany', [params.args.data]: {deletedAt: Date.now() }})      
    }
    if (params.action == 'deleteMany' && process.env.NODE_ENV === 'production') {
      Object.assign(params, { action: 'updateMany', [params.args['data']]: {deletedAt: Date.now() }})      
    }
    return next(params)
  })
 ;


}
async function seed() {
  const { email, username, firstName, middleName, lastName, password } = first;
  await prisma.note.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });
  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      middleName,
      lastName,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  // await prisma.note.create({
  //   data: {
  //     title: "My first note",
  //     body: "Hello, world!",
  //     userId: user.id,
  //   },
  // });

  // await prisma.note.create({
  //   data: {
  //     title: "My second note",
  //     body: "Hello, world!",
  //     userId: user.id,
  //   },
  // });
  // const posts = [
  //   {
  //     slug: "my-first-post",
  //     title: "My First Post",
  //     markdown: `
  // # This is my first post

  // Isn't it great?
  //     `.trim(),
  //   },
  //   {
  //     slug: "90s-mixtape",
  //     title: "A Mixtape I Made Just For You",
  //     markdown: `
  // # 90s Mixtape

  // - I wish (Skee-Lo)
  // - This Is How We Do It (Montell Jordan)
  // - Everlong (Foo Fighters)
  // - Ms. Jackson (Outkast)
  // - Interstate Love Song (Stone Temple Pilots)
  // - Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
  // - Just a Friend (Biz Markie)
  // - The Man Who Sold The World (Nirvana)
  // - Semi-Charmed Life (Third Eye Blind)
  // - ...Baby One More Time (Britney Spears)
  // - Better Man (Pearl Jam)
  // - It's All Coming Back to Me Now (Céline Dion)
  // - This Kiss (Faith Hill)
  // - Fly Away (Lenny Kravits)
  // - Scar Tissue (Red Hot Chili Peppers)
  // - Santa Monica (Everclear)
  // - C'mon N' Ride it (Quad City DJ's)
  //     `.trim(),
  //   },
  // ];

  // for (const post of posts) {
  //   await prisma.post.upsert({
  //     where: { slug: post.slug },
  //     update: post,
  //     create: post,
  //   });
  // }
  // const projects = [
  //   {
  //     id: "13011",
  //     idempotentId: "a4db9fef-031f-4220-8856-792db9b1866b",
  //     title: "MGO Dev (MGOD)",
  //     subtitle: "Software",
  //     description: "A software board for developers.",
  //     projectKey: "MGOD",
  //     projectType: "software",
  //     // boardId: '93',
  //     type: "projects",
  //     favourite: true,
  //   },
  //   {
  //     id: "13034",
  //     title: "MGO Amp Experience (MAE)",
  //     idempotentId: "e6b4c4ce-eddf-469c-8b89-9d8caefc903f",
  //     subtitle: "Software",
  //     description: "A software board for a/b testing.",
  //     projectKey: "MAE",
  //     projectType: "software",
  //     // boardId: '123',
  //     type: "projects",
  //     favourite: false,
  //   },
  // ];

  // for (const project of projects) {
  //   await prisma.project.upsert({
  //     where: { id: project.id },
  //     update: project,
  //     create: project,
  //   });
  // }
  // const tasks = [
  //   {
  //     name: "Learn Remix React",
  //     description: "Follow blog tutorial",
  //     idempotentId: "ca708db2-881c-40bb-bfc6-5446806e27b8",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "87cd66b3-7e3d-4a75-8235-33746f9b2f91",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "36408d03-7b64-49f1-bbb5-c547c40f67e1",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "5642b6f8-5eb9-4908-a75a-bb80205065d7",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "d85ffcb6-30ef-4703-abe8-acbe841fb801",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "e97b479b-5486-4716-9b9c-4b73bf0d761d",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "4a8f0451-a225-4497-a60c-d9ebe2834863",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "6bcd457a-fcb9-4e19-8577-911c88dae0aa",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "bc55c736-a232-4157-ab8f-18a9de32db77",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "6b1d13fc-afd8-4be2-9e19-5b9a10c8916b",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "9b34c978-4974-4e49-aee3-e16458bdd2a7",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "785fe2ff-ac4c-4987-b07c-38975a5efc97",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "0e1f73c6-9e8b-4935-a374-b045f092fafa",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "e25e3d8f-abb3-464a-bef1-b7618ebeea32",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "cefa1e62-307f-4ce8-8f43-71147f546c58",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "67440062-1674-4c6f-ba49-839e646b2fe7",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "2e7c9920-73d6-49f9-b14d-3632ee8305f2",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "fd182940-e3ec-4e02-a38d-9ca8bebee974",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "2cb8270d-0448-43f8-beed-52b69a663f8e",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "415e1ef2-763b-42d5-adea-ada263f1ce3f",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "045ff7dd-ee81-4bce-b84a-a0e3715fb8b9",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "14edd5dd-4708-4158-8e93-4b8cfee25b99",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "ba6c034f-24b3-4bc6-bc71-5d5876c41ba1",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "f5211366-f582-429e-b0e0-20d05e13dd0b",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "9e47f2da-ea60-4371-8b5c-d241c0b71bec",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "12d4b5d3-5ba6-44be-a9fd-3f53a01e8133",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "d2f3b13c-2ae2-4bc4-b930-249519a95f79",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "5b984bb7-397b-4792-96cd-d42ca1c8a076",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "3d6485d7-a973-4265-9b4c-88957b2872dd",
  //   },
  //   {
  //     name: "",
  //     description: "",
  //     idempotentId: "6c72b1b7-7fe9-473a-93c6-5e23c9ba0ca3",
  //   },
  // ];

  // for (const task of tasks) {
  //   await prisma.task.upsert({
  //     where: { idempotentId: task.idempotentId },
  //     update: task,
  //     create: task,
  //   });
  // }
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
