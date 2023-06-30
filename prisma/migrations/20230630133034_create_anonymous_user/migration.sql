/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Post` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AnonymousUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idempotentId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "markdown" TEXT,
    "content" TEXT,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Post" ("content", "createdAt", "deletedAt", "id", "markdown", "publishedAt", "slug", "title", "updatedAt") SELECT "content", "createdAt", "deletedAt", "id", "markdown", "publishedAt", "slug", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousUser_id_key" ON "AnonymousUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousUser_idempotentId_key" ON "AnonymousUser"("idempotentId");

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousUser_slug_key" ON "AnonymousUser"("slug");
