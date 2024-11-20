-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "nomeTabela" TEXT NOT NULL,
    "operacao" TEXT NOT NULL,
    "antiga" JSONB,
    "nova" JSONB,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);