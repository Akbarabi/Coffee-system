-- DropForeignKey
ALTER TABLE "order_list" DROP CONSTRAINT "order_list_id_fkey";

-- AlterTable
ALTER TABLE "order_detail" ALTER COLUMN "order_id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
