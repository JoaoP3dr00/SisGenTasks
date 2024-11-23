import { PrismaService } from "src/dataac/conn/prisma.conn";
import { UserDTO } from "src/domain/dto/CreateUserDTO";
import { GetUserDTO } from "src/domain/dto/GetUserDTO";
import { Response } from "express";
export declare class UserController {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(userDTO: UserDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserById(getUserDTO: GetUserDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUsers(res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(id: number, userDTO: UserDTO, res: Response): Promise<Response<any, Record<string, any>>>;
}
