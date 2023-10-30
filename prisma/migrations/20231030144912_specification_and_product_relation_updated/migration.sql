/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `Specification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Specification_product_id_key" ON "Specification"("product_id");
