  /*
  Warnings:

  - You are about to drop the column `taskId` on the `Log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_taskId_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "taskId";

-- Criando trigger para usuario
CREATE TRIGGER user_trigger
AFTER UPDATE OR DELETE
ON "Usuario" FOR EACH ROW
EXECUTE FUNCTION logg();

ALTER TABLE "Usuario" ENABLE TRIGGER user_trigger;

-- Criando trigger para task principal
CREATE TRIGGER task_principal_trigger
AFTER UPDATE OR DELETE
ON "TaskPrincipal" FOR EACH ROW
EXECUTE FUNCTION logg();

ALTER TABLE "TaskPrincipal" ENABLE TRIGGER task_principal_trigger;