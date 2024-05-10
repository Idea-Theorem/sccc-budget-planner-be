/*
  Warnings:

  - Added the required column `hourlyRate` to the `EmployeeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryRate` to the `EmployeeDepartment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeeDepartment" ADD COLUMN     "hourlyRate" TEXT NOT NULL,
ADD COLUMN     "salaryRate" TEXT NOT NULL;
