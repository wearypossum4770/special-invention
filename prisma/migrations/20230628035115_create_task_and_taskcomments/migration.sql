-- CreateTable
CREATE TABLE "TaskComments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idempotentId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "TaskComments_idempotentId_fkey" FOREIGN KEY ("idempotentId") REFERENCES "Task" ("idempotentId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idempotentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_idempotentId_key" ON "Task"("idempotentId");
