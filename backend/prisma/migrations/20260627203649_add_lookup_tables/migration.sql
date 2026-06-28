/*
  Warnings:

  - You are about to drop the column `aadhaarNumber` on the `Beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `cardStatus` on the `Beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `familyId` on the `Beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `scheme` on the `Beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `searchBy` on the `Beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `subScheme` on the `Beneficiary` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Beneficiary_aadhaarNumber_key";

-- AlterTable
ALTER TABLE "Beneficiary" DROP COLUMN "aadhaarNumber",
DROP COLUMN "cardStatus",
DROP COLUMN "district",
DROP COLUMN "familyId",
DROP COLUMN "scheme",
DROP COLUMN "searchBy",
DROP COLUMN "subScheme",
ADD COLUMN     "districtId" INTEGER,
ADD COLUMN     "schemeId" INTEGER,
ADD COLUMN     "stateLookupId" INTEGER,
ADD COLUMN     "subSchemeId" INTEGER;

-- CreateTable
CREATE TABLE "Scheme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateLookup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StateLookup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubScheme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubScheme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scheme_name_key" ON "Scheme"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StateLookup_name_key" ON "StateLookup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubScheme_name_key" ON "SubScheme"("name");

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_stateLookupId_fkey" FOREIGN KEY ("stateLookupId") REFERENCES "StateLookup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_subSchemeId_fkey" FOREIGN KEY ("subSchemeId") REFERENCES "SubScheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "StateLookup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
