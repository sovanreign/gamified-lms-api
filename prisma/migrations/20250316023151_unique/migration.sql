/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lesson_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_content_key" ON "Lesson"("content");
