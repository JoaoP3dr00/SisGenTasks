/*
  Warnings:

  - You are about to drop the `Teste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Teste";

-- CreateTable
CREATE TABLE "CategoriaTask" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tarefaId" INTEGER NOT NULL,

    CONSTRAINT "CategoriaTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "local" TEXT NOT NULL,
    "criadorId" INTEGER NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoUsuario" (
    "numero_inscricao" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "eventoId" INTEGER NOT NULL,

    CONSTRAINT "EventoUsuario_pkey" PRIMARY KEY ("numero_inscricao")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaTask_tarefaId_key" ON "CategoriaTask"("tarefaId");

-- CreateIndex
CREATE UNIQUE INDEX "Evento_nome_key" ON "Evento"("nome");

-- AddForeignKey
ALTER TABLE "CategoriaTask" ADD CONSTRAINT "CategoriaTask_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoUsuario" ADD CONSTRAINT "EventoUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoUsuario" ADD CONSTRAINT "EventoUsuario_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
