-- AlterTable
ALTER TABLE "order" ADD COLUMN     "notificationSent30Days" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationSent7Days" BOOLEAN NOT NULL DEFAULT false;
