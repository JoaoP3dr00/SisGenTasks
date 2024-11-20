import { Module } from "@nestjs/common";
import { TaskController } from "./service/TaskController";
import { DatabaseModule } from "./database.module";
import { PrismaService } from "./dataac/conn/prisma.conn";

@Module({
    imports: [DatabaseModule],
    controllers: [TaskController],
    providers: [PrismaService],
})
export class TaskModule{}