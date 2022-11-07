/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `lotery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drawnUserId]` on the table `lotery` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "assigned" TEXT NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todos_description_key" ON "todos"("description");

-- CreateIndex
CREATE UNIQUE INDEX "todos_assigned_key" ON "todos"("assigned");

-- CreateIndex
CREATE UNIQUE INDEX "lotery_userId_key" ON "lotery"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "lotery_drawnUserId_key" ON "lotery"("drawnUserId");
