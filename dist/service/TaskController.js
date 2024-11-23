"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const prisma_conn_1 = require("../dataac/conn/prisma.conn");
const TaskDTO_1 = require("../domain/dto/TaskDTO");
const GetTaskDTO_1 = require("../domain/dto/GetTaskDTO");
const swagger_1 = require("@nestjs/swagger");
let TaskController = class TaskController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTask(taskDTO, res) {
        try {
            const u = await this.prisma.usuario.findUnique({
                where: { id: taskDTO.usuarioId },
            });
            if (!u) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    message: 'Usuario não encontrado'
                });
            }
            const t = await this.prisma.task.findUnique({
                where: {
                    nome: taskDTO.name
                }
            });
            if (t) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    message: 'Nome de task já existe'
                });
            }
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
            return res.status(common_1.HttpStatus.CREATED).json(tarefa);
        }
        catch (erro) {
            console.log(erro);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro interno.'
            });
        }
    }
    async deleteTask(id, res) {
        try {
            const task = await this.prisma.task.findUnique({ where: { id: +id } });
            if (!task) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    message: 'Task não encontrada'
                });
            }
            await this.prisma.task.delete({ where: { id: +id } });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro interno'
            });
        }
    }
    async getTaskById(getTaskDTO, res) {
        try {
            const task = await this.prisma.task.findUnique({
                where: {
                    id: +getTaskDTO.id
                },
                include: {
                    tipos: true
                }
            });
            if (!task) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    message: 'Tarefa não encontrada'
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                task: task,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro interno'
            });
        }
    }
    async getAllTask(res) {
        try {
            const tasks = await this.prisma.task.findMany({
                include: {
                    tipos: true
                }
            });
            return res.status(common_1.HttpStatus.OK).json(tasks);
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro ao buscar tasks'
            });
        }
    }
    async updateTask(id, taskDTO, res) {
        try {
            const task = await this.prisma.task.findUnique({ where: { id: +id } });
            if (!task) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
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
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Task atualizada com sucesso',
                updatedTask: updatedTask,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro interno'
            });
        }
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma task', description: 'Este endpoint permite criar uma nova task com os detalhes fornecidos no JSON.' }),
    (0, swagger_1.ApiBody)({
        description: 'Estrutura do JSON esperado',
        examples: {
            exemplo1: {
                value: {
                    name: "Dar banho no Ernesto",
                    tipos: ["Cuidado do PET"],
                    descricao: "Usar shampoo próprio.",
                    usuarioId: 5
                }
            }
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "Task criada"
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Erro ao tentar encontrar o usuário com o id fornecido"
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: "Erro ao tentar cadastrar uma task que já está cadastrada com o nome fornecido"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskDTO_1.TaskDTO, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deletar uma task', description: 'Este endpoint permite deletar uma task com um id fornecido como parâmetro da URL, como /delete/1.' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Task não encontrada"
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Usuário deletado"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar uma task', description: 'Este endpoint permite buscar uma task com em um id fornecido no JSON.' }),
    (0, swagger_1.ApiBody)({
        description: 'Estrutura do JSON esperado',
        examples: {
            exemplo1: {
                value: {
                    id: 2
                },
            }
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Task não encontrada"
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Task encontrada e retornada"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetTaskDTO_1.GetTaskDTO, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTaskById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar tasks', description: 'Este endpoint permite buscar todas as tasks apenas acessando ele.' }),
    (0, swagger_1.ApiOkResponse)({
        description: "Tasks retornadas"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Get)("/todos"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAllTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar uma task', description: 'Este endpoint permite atualizar uma task com um id fornecido na URL e os dados no JSON.' }),
    (0, swagger_1.ApiBody)({
        description: 'Estrutura da URL: /atualizar/3 e estrutura do JSON abaixo',
        examples: {
            exemplo1: {
                value: {
                    name: "Almoçar",
                    tipos: ["Rotina", "Alimentação"],
                    descricao: "Comer das 20h-21h.",
                    usuarioId: 3
                }
            }
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Task não encontrada"
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Task atualizada com sucesso"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Patch)('/atualizar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, TaskDTO_1.TaskDTO, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('/task'),
    __metadata("design:paramtypes", [prisma_conn_1.PrismaService])
], TaskController);
//# sourceMappingURL=TaskController.js.map