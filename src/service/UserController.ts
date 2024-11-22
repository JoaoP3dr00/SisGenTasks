import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { PrismaService } from "src/dataac/conn/prisma.conn";
import { UserDTO } from "src/domain/dto/CreateUserDTO";
import { GetUserDTO } from "src/domain/dto/GetUserDTO";
import { Response } from "express";
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('/users')
export class UserController {
    constructor(private prisma: PrismaService){}

    @ApiOperation({ summary: 'Criar um usuário', description: 'Este endpoint permite criar um novo usuário com os detalhes fornecidos no JSON.' })
    @ApiBody({
        description: 'Estrutura do JSON esperado',
        examples: {
            exemplo1: {
                value: {
                    name:"Diocleverson",
                    email:"dio@gmail.com",
                    password:"123"
                }
            }
        },
    })
    @ApiCreatedResponse({
        description: "Usuário criado"
    })
    @ApiConflictResponse({
        description: "Erro ao tentar cadastrar um email que já está cadastrado"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
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
            
            return res.status(HttpStatus.CREATED).json(user);
        }catch(erro){
            console.log(erro);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro ao criar tarefa' 
            });        
        }
    }

    @ApiOperation({ summary: 'Deletar um usuário', description: 'Este endpoint permite deletar um usuário com um id fornecido como parâmetro da URL, como /delete/1.' })
    @ApiNotFoundResponse({
        description: "Usuário não encontrado"
    })
    @ApiOkResponse({
        description: "Usuário deletado"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
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
            return res.status(HttpStatus.OK).json({ 
                message: 'Usuário deletado' 
            });  
        } catch(error){
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno' 
            });        
        }
    }

    @ApiOperation({ summary: 'Buscar um usuário', description: 'Este endpoint permite buscar um usuário com em um id fornecido no JSON.' })
    @ApiBody({
        description: 'Estrutura do JSON esperado',
        examples: {
            exemplo1: {
                value: {
                    id:2
                },
            }
        },
    })
    @ApiNotFoundResponse({
        description: "Usuário não encontrado"
    })
    @ApiOkResponse({
        description: "Usuário encontrado e retornado"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
    @Get('/')
    async getUserById(@Body() getUserDTO: GetUserDTO, @Res() res: Response) {
        try {
            const u = await this.prisma.usuario.findUnique({ where: { id: +getUserDTO.id } });

            if (!u) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Usuário não encontrado' 
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

    @ApiOperation({ summary: 'Buscar usuários', description: 'Este endpoint permite buscar todos os usuários apenas acessando ele, pode retornar um array vazio caso não existam.' })
    @ApiOkResponse({
        description: "Usuários retornados"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
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

    @ApiOperation({ summary: 'Atualizar um usuário', description: 'Este endpoint permite atualizar um usuário com um id fornecido na URL e os dados no JSON.' })
    @ApiBody({
        description: 'Estrutura da URL: /atualizar/1 e estrutura do JSON abaixo',
        examples: {
            exemplo1: {
                value: {
                    name:"joaaaope",
                    email:"oioi",
                    password:"123"
                }
            }
        },
    })
    @ApiNotFoundResponse({
        description: "Usuário não encontrado"
    })
    @ApiOkResponse({
        description: "Usuário atualizado com sucesso"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
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