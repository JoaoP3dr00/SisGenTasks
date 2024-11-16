import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    password: string
/*
    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    get _name(): string{
        return this.name;
    }

    get _email(): string{
        return this.email;
    }

    get _password(): string{
        return this.password;
    }
*/
}