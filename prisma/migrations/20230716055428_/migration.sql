-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "limitPrice" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
