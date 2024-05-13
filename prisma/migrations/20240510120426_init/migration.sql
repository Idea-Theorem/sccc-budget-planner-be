-- CreateEnum
CREATE TYPE "DepartmentStatus" AS ENUM ('PENDING', 'REJECTED', 'APPROVED');

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "status" "DepartmentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "employee" JSONB[];
