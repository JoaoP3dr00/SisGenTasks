import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { PrismaService } from "./dataac/conn/prisma.conn";
import { TaskPrincipalController } from "./service/TaskPrincipalController";

@Module({
    imports: [DatabaseModule],
    controllers: [TaskPrincipalController],
    providers: [PrismaService],
})
export class TaskPrincipalModule{}