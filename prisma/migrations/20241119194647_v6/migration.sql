/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `CategoriaTask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CategoriaTask_nome_key" ON "CategoriaTask"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Task_nome_key" ON "Task"("nome");
