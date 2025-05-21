/*
  Warnings:

  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - Added the required column `type` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preference` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Remote', 'Onsite', 'Hybrid', 'Any');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "location",
ADD COLUMN     "type" "JobType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "experience" INTEGER NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "preference" "JobType" NOT NULL,
ADD COLUMN     "skills" TEXT[];
