#! /bin/bash

npx prisma db push
npx prisma db seed
npx prisma migrate dev
