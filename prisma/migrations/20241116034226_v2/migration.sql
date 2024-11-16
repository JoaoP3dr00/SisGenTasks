/*
  Warnings:

  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuario_nome_key";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "senha" TEXT NOT NULL;
