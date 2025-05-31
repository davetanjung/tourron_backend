-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "activity_description" VARCHAR(200) NOT NULL,
    "meeting_time" TIME(0) NOT NULL,
    "itineraryDayId" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_itineraryDayId_fkey" FOREIGN KEY ("itineraryDayId") REFERENCES "itineraryDays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
