/*
  Warnings:

  - Added the required column `department` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ALTER COLUMN "address2" SET DEFAULT '';
