-- CreateTable
CREATE TABLE "itineraries" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP(0) NOT NULL,
    "end_date" TIMESTAMP(0) NOT NULL,
    "estimate_start" TIMESTAMP(0) NOT NULL,
    "estimate_end" TIMESTAMP(0) NOT NULL,
    "total_person" INTEGER NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itineraryDays" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(0) NOT NULL,
    "start_time" TIMESTAMP(0) NOT NULL,
    "end_time" TIMESTAMP(0) NOT NULL,
    "activity_description" VARCHAR(200) NOT NULL,
    "meeting_time" TIME(0) NOT NULL,

    CONSTRAINT "itineraryDays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
