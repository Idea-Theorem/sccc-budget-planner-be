-- AlterEnum
ALTER TYPE "DepartmentStatus" ADD VALUE 'INIT';

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "status" SET DEFAULT 'INIT';
