/*
  Warnings:

  - You are about to drop the column `salerId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `salerId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `salerId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `salerId` on the `NotificationItem` table. All the data in the column will be lost.
  - You are about to drop the column `salerId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `salerId` on the `TopSaler` table. All the data in the column will be lost.
  - You are about to drop the column `salerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Saler` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `salesmanId` on table `Shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salesmanId` on table `TopSaler` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_salerId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_salerId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_salerId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationItem" DROP CONSTRAINT "NotificationItem_salerId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_salerId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_salesmanId_fkey";

-- DropForeignKey
ALTER TABLE "TopSaler" DROP CONSTRAINT "TopSaler_salerId_fkey";

-- DropForeignKey
ALTER TABLE "TopSaler" DROP CONSTRAINT "TopSaler_salesmanId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "salerId";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "salerId";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "salerId";

-- AlterTable
ALTER TABLE "NotificationItem" DROP COLUMN "salerId";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "salerId",
ALTER COLUMN "salesmanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TopSaler" DROP COLUMN "salerId",
ALTER COLUMN "salesmanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "salerId",
ADD COLUMN     "salesmanId" TEXT;

-- DropTable
DROP TABLE "Saler";

-- AddForeignKey
ALTER TABLE "TopSaler" ADD CONSTRAINT "TopSaler_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "Salesman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "Salesman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
