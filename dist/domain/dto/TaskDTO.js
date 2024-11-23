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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class TaskDTO {
}
exports.TaskDTO = TaskDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome de uma task',
        example: 'Caminhar',
    }),
    __metadata("design:type", String)
], TaskDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipos de categorias da task',
        example: 'Exercício físico, Rotina',
    }),
    __metadata("design:type", Array)
], TaskDTO.prototype, "tipos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição da task',
        example: 'Correr de manhã, em jejum, por 1h.',
    }),
    __metadata("design:type", String)
], TaskDTO.prototype, "descricao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do usuário que criou a task',
        example: '1',
    }),
    __metadata("design:type", Number)
], TaskDTO.prototype, "usuarioId", void 0);
//# sourceMappingURL=TaskDTO.js.map