-- DropForeignKey
ALTER TABLE "CategoriaTask" DROP CONSTRAINT "CategoriaTask_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_criadorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_usuarioId_fkey";

-- CreateTable
CREATE TABLE "_CategoriaTaskToTarefa" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaTaskToTarefa_AB_unique" ON "_CategoriaTaskToTarefa"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaTaskToTarefa_B_index" ON "_CategoriaTaskToTarefa"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaTaskToTarefa" ADD CONSTRAINT "_CategoriaTaskToTarefa_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoriaTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaTaskToTarefa" ADD CONSTRAINT "_CategoriaTaskToTarefa_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
