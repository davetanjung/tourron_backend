-- DropForeignKey
ALTER TABLE "itineraryDays" DROP CONSTRAINT "itineraryDays_itineraryId_fkey";

-- AddForeignKey
ALTER TABLE "itineraryDays" ADD CONSTRAINT "itineraryDays_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
