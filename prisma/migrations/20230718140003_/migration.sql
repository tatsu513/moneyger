-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "maxAmount" INTEGER NOT NULL,
    "currentAmount" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentHistory" (
    "id" SERIAL NOT NULL,
    "note" TEXT,
    "price" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
