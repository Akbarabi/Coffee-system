/*
  Warnings:

  - You are about to drop the `order_lsit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_lsit" DROP CONSTRAINT "order_lsit_id_fkey";

-- DropTable
DROP TABLE "order_lsit";

-- CreateTable
CREATE TABLE "order_list" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL DEFAULT '',
    "order_type" TEXT NOT NULL DEFAULT '',
    "order_date" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "order_list_id_key" ON "order_list"("id");

-- AddForeignKey
ALTER TABLE "order_list" ADD CONSTRAINT "order_list_id_fkey" FOREIGN KEY ("id") REFERENCES "order_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
