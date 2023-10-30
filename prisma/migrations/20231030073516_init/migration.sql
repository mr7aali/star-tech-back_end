-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "key_features" TEXT[],
    "image" TEXT[],

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specification" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Display" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "touch_screen" TEXT NOT NULL,
    "refresh_rate" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "specification_id" INTEGER NOT NULL,

    CONSTRAINT "Display_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Processor" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "core" TEXT NOT NULL,
    "thread" TEXT NOT NULL,
    "cpu_cache" TEXT NOT NULL,
    "specification_id" INTEGER NOT NULL,

    CONSTRAINT "Processor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Specification" ADD CONSTRAINT "Specification_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Display" ADD CONSTRAINT "Display_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "Specification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processor" ADD CONSTRAINT "Processor_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "Specification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
