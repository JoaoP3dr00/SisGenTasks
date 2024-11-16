import { Module } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./dataac/conn/prisma.conn";
import { UserRepository } from "./dataac/repositories/impl/UserRepository";
import { AbstractUserRepository } from "./dataac/repositories/AbstractUserRepository";

@Module({
    providers: [PrismaService],
})
export class DatabaseModule {}