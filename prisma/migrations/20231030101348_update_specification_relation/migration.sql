/*
  Warnings:

  - A unique constraint covering the columns `[specification_id]` on the table `Display` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[specification_id]` on the table `Processor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Display_specification_id_key" ON "Display"("specification_id");

-- CreateIndex
CREATE UNIQUE INDEX "Processor_specification_id_key" ON "Processor"("specification_id");
