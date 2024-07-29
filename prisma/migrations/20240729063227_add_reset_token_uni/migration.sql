/*
  Warnings:

  - A unique constraint covering the columns `[comment_id]` on the table `UserComment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserComment_comment_id_key" ON "UserComment"("comment_id");
