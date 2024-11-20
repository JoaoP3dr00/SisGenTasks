/*
  Warnings:

  - You are about to drop the column `taskId` on the `CategoriaTask` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CategoriaTask_taskId_key";

-- AlterTable
ALTER TABLE "CategoriaTask" DROP COLUMN "taskId";

CREATE OR REPLACE FUNCTION logg()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO "Log" ("nomeTabela", "operacao", "antiga", "nova")
    VALUES (
      TG_TABLE_NAME,
      TG_OP,
      row_to_json(OLD),
      row_to_json(NEW)
    );
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO "Log" ("nomeTabela", "operacao", "antiga", "nova")
    VALUES (
      TG_TABLE_NAME,
      TG_OP,
      row_to_json(OLD),
      NULL
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER task_trigger
AFTER UPDATE OR DELETE
ON "Task" FOR EACH ROW
EXECUTE FUNCTION logg();

ALTER TABLE "Task" ENABLE TRIGGER task_trigger;