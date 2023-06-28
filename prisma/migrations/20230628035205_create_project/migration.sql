-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idempotentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "projectKey" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    "projectType" TEXT NOT NULL
);
