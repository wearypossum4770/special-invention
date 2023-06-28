#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex
# Seeding command

npx prisma db push
npx prisma db seed
npx prisma migrate dev
