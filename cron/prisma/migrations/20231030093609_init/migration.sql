-- CreateTable
CREATE TABLE "Cat" (
    "id" SERIAL NOT NULL,
    "imgURL" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);
