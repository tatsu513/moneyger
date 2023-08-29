/*
  Warnings:

  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_paymentId_fkey";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "maxAmount" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
