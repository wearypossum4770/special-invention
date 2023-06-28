import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();



const first = {
  get email() {
    return `${this.username}@example.com`;
  },
  get username() {
    return `${this.firstName}.${this.middleName ? this.middleName[0] : ""}.${
      this.lastName
    }`;
  },
  firstName: "john",
  middleName: "daniel",
  lastName: "doe",
  password: "password1",
};
async function main() {
  // https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware#step-1-store-status-of-record
  prisma
  /***********************************/
  /* SOFT DELETE MIDDLEWARE */
  /***********************************/  
  .$use(async (params, next) => {
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

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      profileId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      profileId: user.id,
    },
  });
  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      markdown: `
  # This is my first post
  
  Isn't it great?
      `.trim(),
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      markdown: `
  # 90s Mixtape
  
  - I wish (Skee-Lo)
  - This Is How We Do It (Montell Jordan)
  - Everlong (Foo Fighters)
  - Ms. Jackson (Outkast)
  - Interstate Love Song (Stone Temple Pilots)
  - Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
  - Just a Friend (Biz Markie)
  - The Man Who Sold The World (Nirvana)
  - Semi-Charmed Life (Third Eye Blind)
  - ...Baby One More Time (Britney Spears)
  - Better Man (Pearl Jam)
  - It's All Coming Back to Me Now (Céline Dion)
  - This Kiss (Faith Hill)
  - Fly Away (Lenny Kravits)
  - Scar Tissue (Red Hot Chili Peppers)
  - Santa Monica (Everclear)
  - C'mon N' Ride it (Quad City DJ's)
      `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  const projects = [
    {
      id: "13011",
      title: "MGO Dev (MGOD)",
      subtitle: "Software",
      description: "A software board for developers.",
      projectKey: "MGOD",
      projectType: "software",
      boardId: "93",
      type: "projects",
      favourite: true,
    },
    {
      id: "13034",
      title: "MGO Amp Experience (MAE)",
      subtitle: "Software",
      description: "A software board for a/b testing.",
      projectKey: "MAE",
      projectType: "software",
      boardId: "123",
      type: "projects",
      favourite: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    });
  }
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
