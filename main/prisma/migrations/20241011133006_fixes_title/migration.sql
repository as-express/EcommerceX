/*
  Warnings:

  - You are about to drop the column `decription` on the `Achievement` table. All the data in the column will be lost.
  - Added the required column `description` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "decription",
ADD COLUMN     "description" TEXT NOT NULL;
