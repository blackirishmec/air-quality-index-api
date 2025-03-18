-- CreateTable
CREATE TABLE "city_station_id" (
    "id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "station_id" INTEGER NOT NULL,

    CONSTRAINT "city_station_id_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "city_station_id_city_name_key" ON "city_station_id"("city_name");
