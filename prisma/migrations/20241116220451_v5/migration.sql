/*
  Warnings:

  - You are about to drop the column `tarefaId` on the `CategoriaTask` table. All the data in the column will be lost.
  - You are about to drop the `Evento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventoUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoriaTaskToTarefa` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `CategoriaTask` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `CategoriaTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_criadorId_fkey";

-- DropForeignKey
ALTER TABLE "EventoUsuario" DROP CONSTRAINT "EventoUsuario_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "EventoUsuario" DROP CONSTRAINT "EventoUsuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriaTaskToTarefa" DROP CONSTRAINT "_CategoriaTaskToTarefa_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriaTaskToTarefa" DROP CONSTRAINT "_CategoriaTaskToTarefa_B_fkey";

-- DropIndex
DROP INDEX "CategoriaTask_tarefaId_key";

-- DropIndex
DROP INDEX "Task_nome_key";

-- AlterTable
ALTER TABLE "CategoriaTask" DROP COLUMN "tarefaId",
ADD COLUMN     "taskId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Evento";

-- DropTable
DROP TABLE "EventoUsuario";

-- DropTable
DROP TABLE "_CategoriaTaskToTarefa";

-- CreateTable
CREATE TABLE "TaskPrincipal" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "TaskPrincipal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriaTaskToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoriaTaskToTaskPrincipal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskPrincipal_usuarioId_key" ON "TaskPrincipal"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaTaskToTask_AB_unique" ON "_CategoriaTaskToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaTaskToTask_B_index" ON "_CategoriaTaskToTask"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaTaskToTaskPrincipal_AB_unique" ON "_CategoriaTaskToTaskPrincipal"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaTaskToTaskPrincipal_B_index" ON "_CategoriaTaskToTaskPrincipal"("B");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaTask_taskId_key" ON "CategoriaTask"("taskId");

-- AddForeignKey
ALTER TABLE "TaskPrincipal" ADD CONSTRAINT "TaskPrincipal_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaTaskToTask" ADD CONSTRAINT "_CategoriaTaskToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoriaTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaTaskToTask" ADD CONSTRAINT "_CategoriaTaskToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaTaskToTaskPrincipal" ADD CONSTRAINT "_CategoriaTaskToTaskPrincipal_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoriaTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaTaskToTaskPrincipal" ADD CONSTRAINT "_CategoriaTaskToTaskPrincipal_B_fkey" FOREIGN KEY ("B") REFERENCES "TaskPrincipal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
