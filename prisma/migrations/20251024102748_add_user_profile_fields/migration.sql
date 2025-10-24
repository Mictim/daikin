-- AlterTable
ALTER TABLE "user" ADD COLUMN     "apartmentNumber" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "street" TEXT;
