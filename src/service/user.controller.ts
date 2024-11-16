import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { Http2ServerRequest } from "http2";
import { UserDTO } from "src/domain/dto/UserDTO";
import { UserManager } from "src/domain/UserManager";

@Controller('/users')
export class UserController {
    constructor(private userManager: UserManager){}

    @Post('/create')
    async createPost(@Body() userDTO: UserDTO){
        try{
            const bool = this.userManager.create(userDTO.name, userDTO.email, userDTO.password);

            if(bool)
                return HttpStatus.OK;
            else
                return HttpStatus.BAD_REQUEST;
        }catch(erro){
            console.log(erro);
            return HttpStatus.BAD_REQUEST;
        }
    }
}