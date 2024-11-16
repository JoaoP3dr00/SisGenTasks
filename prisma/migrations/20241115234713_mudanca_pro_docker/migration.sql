-- CreateTable
CREATE TABLE "Teste" (
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Teste_nome_key" ON "Teste"("nome");
