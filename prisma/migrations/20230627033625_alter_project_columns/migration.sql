/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "projectKey" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "favourite" BOOLEAN NOT NULL,
    "boardId" TEXT NOT NULL,
    "projectType" TEXT NOT NULL
);
INSERT INTO "new_Project" ("boardId", "favourite", "id", "projectKey", "projectType", "subtitle", "title", "type") SELECT "boardId", "favourite", "id", "projectKey", "projectType", "subtitle", "title", "type" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
