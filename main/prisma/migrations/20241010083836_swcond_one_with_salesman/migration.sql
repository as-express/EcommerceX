-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "salesmanId" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "salesmanId" TEXT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "salesmanId" TEXT;

-- AlterTable
ALTER TABLE "NotificationItem" ADD COLUMN     "salesmanId" TEXT;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "salesmanId" TEXT;

-- AlterTable
ALTER TABLE "TopSaler" ADD COLUMN     "salesmanId" TEXT;

-- CreateTable
CREATE TABLE "Salesman" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "shopsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Salesman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Salesman_title_key" ON "Salesman"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Salesman_email_key" ON "Salesman"("email");

-- AddForeignKey
ALTER TABLE "TopSaler" ADD CONSTRAINT "TopSaler_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "Salesman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "Salesman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "Salesman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "Salesman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "Salesman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationItem" ADD CONSTRAINT "NotificationItem_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "Salesman"("id") ON DELETE SET NULL ON UPDATE CASCADE;
