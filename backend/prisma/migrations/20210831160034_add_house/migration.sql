/*
  Warnings:

  - Added the required column `houseId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "houseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
