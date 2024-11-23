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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const prisma_conn_1 = require("../dataac/conn/prisma.conn");
const CreateUserDTO_1 = require("../domain/dto/CreateUserDTO");
const GetUserDTO_1 = require("../domain/dto/GetUserDTO");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(userDTO, res) {
        try {
            const u = await this.prisma.usuario.findUnique({ where: { email: userDTO.email } });
            if (u) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    message: 'Email já cadastrado'
                });
            }
            const user = await this.prisma.usuario.create({
                data: {
                    nome: userDTO.name,
                    email: userDTO.email,
                    senha: userDTO.password,
                },
            });
            return res.status(common_1.HttpStatus.CREATED).json(user);
        }
        catch (erro) {
            console.log(erro);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro ao criar tarefa'
            });
        }
    }
    async deleteUser(id, res) {
        try {
            const u = await this.prisma.usuario.findUnique({ where: { id: +id } });
            if (!u) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    message: 'Usuario não encontrado'
                });
            }
            await this.prisma.usuario.delete({ where: { id: +id } });
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Usuário deletado'
            });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro interno'
            });
        }
    }
    async getUserById(getUserDTO, res) {
        try {
            const u = await this.prisma.usuario.findUnique({ where: { id: +getUserDTO.id } });
            if (!u) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    message: 'Usuário não encontrado'
                });
            }
            return res.status(common_1.HttpStatus.OK).json(u);
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro interno'
            });
        }
    }
    async getAllUsers(res) {
        try {
            const usuarios = await this.prisma.usuario.findMany();
            return res.status(common_1.HttpStatus.OK).json(usuarios);
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Erro ao buscar usuarios'
            });
        }
    }
    async updateUser(id, userDTO, res) {
        try {
            const user = await this.prisma.usuario.findUnique({ where: { id: +id } });
            if (!user) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
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
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Usuario atualizada com sucesso',
                updatedUser: updatedUser,
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
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criar um usuário', description: 'Este endpoint permite criar um novo usuário com os detalhes fornecidos no JSON.' }),
    (0, swagger_1.ApiBody)({
        description: 'Estrutura do JSON esperado',
        examples: {
            exemplo1: {
                value: {
                    name: "Diocleverson",
                    email: "dio@gmail.com",
                    password: "123"
                }
            }
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "Usuário criado"
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: "Erro ao tentar cadastrar um email que já está cadastrado"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDTO_1.UserDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deletar um usuário', description: 'Este endpoint permite deletar um usuário com um id fornecido como parâmetro da URL, como /delete/1.' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Usuário não encontrado"
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
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar um usuário', description: 'Este endpoint permite buscar um usuário com em um id fornecido no JSON.' }),
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
        description: "Usuário não encontrado"
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Usuário encontrado e retornado"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetUserDTO_1.GetUserDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar usuários', description: 'Este endpoint permite buscar todos os usuários apenas acessando ele, pode retornar um array vazio caso não existam.' }),
    (0, swagger_1.ApiOkResponse)({
        description: "Usuários retornados"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Get)("/todos"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um usuário', description: 'Este endpoint permite atualizar um usuário com um id fornecido na URL e os dados no JSON.' }),
    (0, swagger_1.ApiBody)({
        description: 'Estrutura da URL: /atualizar/1 e estrutura do JSON abaixo',
        examples: {
            exemplo1: {
                value: {
                    name: "joaaaope",
                    email: "oioi",
                    password: "123"
                }
            }
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Usuário não encontrado"
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Usuário atualizado com sucesso"
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: "Erro interno do servidor"
    }),
    (0, common_1.Patch)('/atualizar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateUserDTO_1.UserDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [prisma_conn_1.PrismaService])
], UserController);
//# sourceMappingURL=UserController.js.map