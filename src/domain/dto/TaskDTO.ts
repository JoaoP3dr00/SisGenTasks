import { ApiProperty } from "@nestjs/swagger"

export class TaskDTO {
    @ApiProperty({
        description: 'Nome de uma task',
        example: 'Caminhar',
    })
    name: string
    
    @ApiProperty({
        description: 'Tipos de categorias da task',
        example: 'Exercício físico, Rotina',
    })
    tipos: string[]

    @ApiProperty({
        description: 'Descrição da task',
        example: 'Correr de manhã, em jejum, por 1h.',
    })
    descricao: string

    @ApiProperty({
        description: 'ID do usuário que criou a task',
        example: '1',
    })
    usuarioId: number
}