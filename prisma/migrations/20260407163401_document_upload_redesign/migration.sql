/*
  Warnings:

  - You are about to drop the column `fileType` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Document` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,department]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filePath` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "fileType",
DROP COLUMN "fileUrl",
ADD COLUMN     "filePath" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_department_key" ON "Employee"("email", "department");
