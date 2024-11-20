import { Module } from "@nestjs/common";
import { PrismaService } from "./dataac/conn/prisma.conn";

@Module({
    providers: [PrismaService],
})
export class DatabaseModule {}