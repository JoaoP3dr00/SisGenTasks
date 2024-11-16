import { Module } from "@nestjs/common";
import { UserController } from "./service/user.controller";
import { UserManager } from "./domain/UserManager";
import { DatabaseModule } from "./database.module";
import { UserRepository } from "./dataac/repositories/impl/UserRepository";
import { PrismaService } from "./dataac/conn/prisma.conn";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserManager, UserRepository, PrismaService],
})
export class UserModule{}