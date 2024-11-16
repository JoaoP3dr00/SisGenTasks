import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/dataac/entity/UserEntity";
import { UserRepository } from "src/dataac/repositories/impl/UserRepository";
import { hash } from "bcrypt";

@Injectable()
export class UserManager {
    constructor(private userRepository: UserRepository){}

    async create(name: string, email: string, password: string): Promise<boolean>{
        try{
            // fazer verificação do email
            const user = new UserEntity(name, email, await hash(password, 10));

            const bool = await this.userRepository.create(user);
            if(bool)
                return true;
            else
                return false;
        }catch(erro){
            console.log(erro);
            return false;
        }
    }
}