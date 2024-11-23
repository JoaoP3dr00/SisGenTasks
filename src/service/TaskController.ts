import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { PrismaService } from "src/dataac/conn/prisma.conn";
import { TaskDTO } from "src/domain/dto/TaskDTO";
import { Response } from "express";
import { GetTaskDTO } from "src/domain/dto/GetTaskDTO";
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller('/task')
export class TaskController {
    constructor(private prisma: PrismaService){}

    @ApiOperation({ summary: 'Criar uma task', description: 'Este endpoint permite criar uma nova task com os detalhes fornecidos no JSON.' })
    @ApiBody({
        description: 'Estrutura do JSON esperado',
        examples: {
            exemplo1: {
                value: {
                    name:"Dar banho no Ernesto",
                    tipos: ["Cuidado do PET"],
                    descricao:"Usar shampoo próprio.",
                    usuarioId:5
                }
            }
        },
    })
    @ApiCreatedResponse({
        description: "Task criada"
    })
    @ApiNotFoundResponse({
        description: "Erro ao tentar encontrar o usuário com o id fornecido"
    })
    @ApiConflictResponse({
        description: "Erro ao tentar cadastrar uma task que já está cadastrada com o nome fornecido"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
    @Post('/create')
    async createTask(@Body() taskDTO: TaskDTO, @Res() res: Response){
        try{
            // Verificar se o usuário existe no banco
            const u = await this.prisma.usuario.findUnique({
                where: { id: taskDTO.usuarioId },
            });
            
            if (!u) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Usuario não encontrado' 
                });                
            }

            const t = await this.prisma.task.findUnique({
                where: {
                    nome: taskDTO.name
                }
            });

            if(t){
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Nome de task já existe'
                });
            }

            // Criar a tarefa
            var tarefa = await this.prisma.task.create({
                data: {
                    nome: taskDTO.name,
                    descricao: taskDTO.descricao,
                    tipos: {
                        connectOrCreate: taskDTO.tipos.map((tipo) => ({
                            where: { nome: tipo },
                            create: { nome: tipo },
                        }))
                    },
                    usuario: {
                        connect: { id: taskDTO.usuarioId }
                    },
                },
            });

            return res.status(HttpStatus.CREATED).json(tarefa);
        }catch(erro){
            console.log(erro);
        
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno.' 
            });               
        }
    }

    @ApiOperation({ summary: 'Deletar uma task', description: 'Este endpoint permite deletar uma task com um id fornecido como parâmetro da URL, como /delete/1.' })
    @ApiNotFoundResponse({
        description: "Task não encontrada"
    })
    @ApiOkResponse({
        description: "Usuário deletado"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTask(@Param('id') id: number, @Res() res: Response) { 
        try{
            const task = await this.prisma.task.findUnique({ where: { id: +id } });

            if (!task) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Task não encontrada' 
                });            
            }

            await this.prisma.task.delete({ where: { id: +id } });
        } catch(error){
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno' 
            });        
        }
    }

    // @ApiOperation({ summary: 'Buscar uma task', description: 'Este endpoint permite buscar uma task com em um id fornecido no JSON.' })
    // @ApiBody({
    //     description: 'Estrutura do JSON esperado',
    //     examples: {
    //         exemplo1: {
    //             value: {
    //                 id:2
    //             },
    //         }
    //     },
    // })
    // @ApiNotFoundResponse({
    //     description: "Task não encontrada"
    // })
    // @ApiOkResponse({
    //     description: "Task encontrada e retornada"
    // })
    // @ApiInternalServerErrorResponse({
    //     description: "Erro interno do servidor"
    // })
    // @Get('/')
    // async getTaskById(@Body() getTaskDTO: GetTaskDTO, @Res() res: Response) {
    //     try {
    //         const task = await this.prisma.task.findUnique({ 
    //             where: { 
    //                 id: +getTaskDTO.id 
    //             },
    //             include: {
    //                 tipos: true
    //             }
    //         });

    //         if (!task) {
    //             return res.status(HttpStatus.NOT_FOUND).json({ 
    //                 message: 'Tarefa não encontrada' 
    //             });
    //         }

    //         return res.status(HttpStatus.OK).json({
    //             task: task,
    //         });
    //     } catch (error) {
    //         console.error(error);

    //         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
    //             message: 'Erro interno' 
    //         });
    //     }
    // }
   
    @ApiOperation({ summary: 'Buscar tasks', description: 'Este endpoint permite buscar todas as tasks apenas acessando ele.' })
    @ApiOkResponse({
        description: "Tasks retornadas"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
    @Get("/todos")
    async getAllTask(@Res() res: Response) {
        try {
            const tasks = await this.prisma.task.findMany({
                include: {
                    tipos: true
                }
            });

            return res.status(HttpStatus.OK).json(tasks);
        } catch (error) {
            console.error(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro ao buscar tasks' 
            });
        }
    }


    @ApiOperation({ summary: 'Atualizar uma task', description: 'Este endpoint permite atualizar uma task com um id fornecido na URL e os dados no JSON.' })
    @ApiBody({
        description: 'Estrutura da URL: /atualizar/3 e estrutura do JSON abaixo',
        examples: {
            exemplo1: {
                value: {
                    name:"Almoçar",
                    tipos: ["Rotina", "Alimentação"],
                    descricao:"Comer das 20h-21h.",
                    usuarioId:3
                }
            }
        },
    })
    @ApiNotFoundResponse({
        description: "Task não encontrada"
    })
    @ApiOkResponse({
        description: "Task atualizada com sucesso"
    })
    @ApiInternalServerErrorResponse({
        description: "Erro interno do servidor"
    })
    @Patch('/atualizar/:id')
    async updateTask(@Param('id') id: number, @Body() taskDTO: TaskDTO, @Res() res: Response){
        try {
            const task = await this.prisma.task.findUnique({ where: { id: +id } });

            if (!task) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Task não encontrada'
                });
            }

            const updatedTask = await this.prisma.task.update({
                where: { 
                    id: +id 
                },
                data: {
                    nome: taskDTO.name || task.nome,
                    descricao: taskDTO.descricao || task.descricao,
                    tipos: {
                        connectOrCreate: taskDTO.tipos.map((tipo) => ({
                            where: { nome: tipo },
                            create: { nome: tipo },
                        }))
                    },
                    usuario: {
                        connect: { id: taskDTO.usuarioId || task.usuarioId }
                    },
                },
                include: {
                    tipos: true
                },
            });

            return res.status(HttpStatus.OK).json({
                message: 'Task atualizada com sucesso',
                updatedTask: updatedTask,
            });
        } catch (error) {
            console.error(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno' 
            });
        }
    }
}