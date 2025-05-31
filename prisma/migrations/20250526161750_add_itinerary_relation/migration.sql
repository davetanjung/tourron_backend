/*
  Warnings:

  - Added the required column `itineraryId` to the `itineraryDays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itineraryDays" ADD COLUMN     "itineraryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "itineraryDays" ADD CONSTRAINT "itineraryDays_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
