/*
  Warnings:

  - You are about to drop the column `firstName` on the `lotery` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `lotery` table. All the data in the column will be lost.
  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "lotery" DROP CONSTRAINT "lotery_userId_fkey";

-- AlterTable
ALTER TABLE "lotery" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "drawnUserId" INTEGER,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "nickName" TEXT,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
