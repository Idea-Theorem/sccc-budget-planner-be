/*
  Warnings:

  - You are about to drop the column `compensation_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `employment_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `salary_rate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "compensation_type",
DROP COLUMN "employment_type",
DROP COLUMN "salary_rate";
