-- CreateTable
CREATE TABLE "coffee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "size" TEXT NOT NULL DEFAULT '',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "order_detail" (
    "id" SERIAL NOT NULL,
    "coffe_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "order_lsit" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL DEFAULT '',
    "order_type" TEXT NOT NULL DEFAULT '',
    "order_date" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "coffee_id_key" ON "coffee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_detail_id_key" ON "order_detail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_lsit_id_key" ON "order_lsit"("id");

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_coffe_id_fkey" FOREIGN KEY ("coffe_id") REFERENCES "coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_lsit" ADD CONSTRAINT "order_lsit_id_fkey" FOREIGN KEY ("id") REFERENCES "order_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
