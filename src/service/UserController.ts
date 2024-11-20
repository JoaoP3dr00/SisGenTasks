import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { PrismaService } from "src/dataac/conn/prisma.conn";
import { UserDTO } from "src/domain/dto/CreateUserDTO";
import { GetUserDTO } from "src/domain/dto/GetUserDTO";
import { Response } from "express";

@Controller('/users')
export class UserController {
    constructor(private prisma: PrismaService){}

    @Post('/create')
    async createUser(@Body() userDTO: UserDTO, @Res() res: Response){        
        try{
            // Verifica se o email já existe no banco
            const u = await this.prisma.usuario.findUnique({ where: { email: userDTO.email } });

            if (u) {
                return res.status(HttpStatus.CONFLICT).json({ 
                    message: 'Email já cadastrado' 
                });              
            }

            // Cria o usuário
            const user = await this.prisma.usuario.create({
                data: {
                    nome: userDTO.name,
                    email: userDTO.email,
                    senha: userDTO.password,
                },
            });
            
            return res.status(HttpStatus.OK).json(user);
        }catch(erro){
            console.log(erro);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro ao buscar tarefa' 
            });        
        }
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id') id: number, @Res() res: Response) { 
        try{
            const u = await this.prisma.usuario.findUnique({ where: { id: +id } });

            if (!u) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Usuario não encontrado' 
                });            
            }

            await this.prisma.usuario.delete({ where: { id: +id } });
        } catch(error){
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno' 
            });        
        }
    }

    @Get('/')
    async getUserById(@Body() getUserDTO: GetUserDTO, @Res() res: Response) {
        try {
            const u = await this.prisma.usuario.findUnique({ where: { id: +getUserDTO.id } });

            if (!u) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Usuário não encontrada' 
                });
            }

            //return { status: HttpStatus.OK, message: u };
            return res.status(HttpStatus.OK).json(u);
        } catch (error) {
            console.error(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno' 
            });
        }
    }

    @Get("/todos")
    async getAllUsers(@Res() res: Response) {
        try {
            const usuarios = await this.prisma.usuario.findMany();

            return res.status(HttpStatus.OK).json(usuarios);
        } catch (error) {
            console.error(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro ao buscar usuarios' 
            });
        }
    }

    @Patch('/atualizar/:id')
    async updateUser(@Param('id') id: number, @Body() userDTO: UserDTO, @Res() res: Response){
        try {
            const user = await this.prisma.usuario.findUnique({ where: { id: +id } });

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Usuario não encontrado' 
                });
            }

            const updatedUser = await this.prisma.usuario.update({
                where: { 
                    id: +id 
                },
                data: {
                    nome: userDTO.name || user.nome,
                    email: userDTO.email || user.email,
                    senha: userDTO.password || user.senha,
                },
            });

            return res.status(HttpStatus.OK).json({
                message: 'Usuario atualizada com sucesso',
                updatedUser: updatedUser,
            });
        } catch (error) {
            console.error(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno' 
            });
        }
    }
}