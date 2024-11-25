import { Module } from "@nestjs/common";
import { UserController } from "./service/UserController";
import { DatabaseModule } from "./database.module";
import { PrismaService } from "./dataac/conn/prisma.conn";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [PrismaService],
})
export class UserModule{}