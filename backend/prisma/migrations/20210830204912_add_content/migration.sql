-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "houseId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Picture" ADD FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
