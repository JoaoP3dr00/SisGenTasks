import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/dataac/conn/prisma.conn";
import { UserEntity } from "src/dataac/entity/UserEntity";
import { AbstractUserRepository } from "src/dataac/repositories/AbstractUserRepository"

@Injectable()
export class UserRepository implements AbstractUserRepository{
    constructor(private prisma: PrismaService){}
    
    async create(user: UserEntity): Promise<boolean> {
        try{
            await this.prisma.usuario.create({
                data: {
                    nome: user._name,
                    email: user._email,
                    senha: user._password,
                }
            });
            return true;
        }catch(erro){
            console.log(erro);
            return false;
        }
    }
}