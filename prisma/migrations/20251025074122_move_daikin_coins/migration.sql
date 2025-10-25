/*
  Warnings:

  - You are about to drop the column `daikinCoins` on the `order_product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "daikinCoins" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "order_product" DROP COLUMN "daikinCoins";
