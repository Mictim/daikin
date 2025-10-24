/*
  Warnings:

  - You are about to drop the column `apartmentNumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "apartmentNumber",
DROP COLUMN "city",
DROP COLUMN "dateOfBirth",
DROP COLUMN "postalCode",
DROP COLUMN "street";

-- CreateTable
CREATE TABLE "user_details" (
    "id" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "street" TEXT,
    "apartmentNumber" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_details_userId_key" ON "user_details"("userId");

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
