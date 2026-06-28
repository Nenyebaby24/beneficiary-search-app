/*
  Warnings:

  - A unique constraint covering the columns `[aadhaarNumber]` on the table `Beneficiary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pmjayId]` on the table `Beneficiary` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Beneficiary" ADD COLUMN     "aadhaarNumber" TEXT,
ADD COLUMN     "cardStatus" TEXT NOT NULL DEFAULT 'Not Generated',
ADD COLUMN     "district" TEXT,
ADD COLUMN     "familyId" TEXT,
ADD COLUMN     "pmjayId" TEXT,
ADD COLUMN     "scheme" TEXT NOT NULL DEFAULT 'PM-JAY',
ADD COLUMN     "searchBy" TEXT,
ADD COLUMN     "subScheme" TEXT,
ADD COLUMN     "verificationStatus" TEXT NOT NULL DEFAULT 'Pending';

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_aadhaarNumber_key" ON "Beneficiary"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_pmjayId_key" ON "Beneficiary"("pmjayId");
