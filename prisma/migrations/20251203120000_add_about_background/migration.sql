-- AlterTable
ALTER TABLE "DesignSetting"
ADD COLUMN     "aboutBackgroundEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "aboutBackgroundImage" TEXT;
