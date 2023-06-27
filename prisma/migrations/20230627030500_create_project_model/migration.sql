-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "projectKey" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "favourite" BOOLEAN NOT NULL,
    "boardId" INTEGER NOT NULL,
    "projectType" TEXT NOT NULL
);
