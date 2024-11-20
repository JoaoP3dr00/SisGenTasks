import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { PrismaService } from "src/dataac/conn/prisma.conn";
import { TaskDTO } from "src/domain/dto/TaskDTO";
import { Response } from "express";
import { GetTaskDTO } from "src/domain/dto/GetTaskDTO";

@Controller('/task-principal')
export class TaskPrincipalController {
    constructor(private prisma: PrismaService){}

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

            // Verifica se o usuário já possuí tarefa principal
            const t = await this.prisma.taskPrincipal.findUnique({
                where:{
                    usuarioId: u.id
                },
            });

            if(t){
                return res.status(HttpStatus.CONFLICT).json({ 
                    message: 'Usuario já possuí tarefa principal' 
                });
            }

            // Criar a tarefa
            var tarefa = await this.prisma.taskPrincipal.create({
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
                include: {
                    tipos: true
                }
            });

            return res.status(HttpStatus.OK).json(tarefa);
        }catch(erro){
            console.log(erro);
        
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno.' 
            });               
        }
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTask(@Param('id') id: number, @Res() res: Response) { 
        try{
            const task = await this.prisma.taskPrincipal.findUnique({ where: { id: +id } });

            if (!task) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Task não encontrada' 
                });            
            }

            await this.prisma.taskPrincipal.delete({ where: { id: +id } });
        } catch(error){
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno' 
            });        
        }
    }

    @Get('/')
    async getTaskById(@Body() getTaskDTO: GetTaskDTO, @Res() res: Response) {
        try {
            const task = await this.prisma.taskPrincipal.findUnique({ 
                where: { 
                    id: +getTaskDTO.id 
                },
                include: {
                    tipos: true
                }
            });

            if (!task) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Tarefa não encontrada' 
                });
            }

            return res.status(HttpStatus.OK).json(task);
        } catch (error) {
            console.error(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                message: 'Erro interno' 
            });
        }
    }
   
    @Get("/todos")
    async getAllTask(@Res() res: Response) {
        try {
            const tasks = await this.prisma.taskPrincipal.findMany({
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

    @Patch('/atualizar/:id')
    async updateTask(@Param('id') id: number, @Body() taskDTO: TaskDTO, @Res() res: Response){
        try {
            const task = await this.prisma.taskPrincipal.findUnique({ where: { id: +id } });

            if (!task) {
                return res.status(HttpStatus.NOT_FOUND).json({ 
                    message: 'Task não encontrada'
                });
            }

            const updatedTask = await this.prisma.taskPrincipal.update({
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
                    }
                },
                include: {
                    tipos: true
                }
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