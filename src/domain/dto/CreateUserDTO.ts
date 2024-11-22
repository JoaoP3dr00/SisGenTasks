import { ApiProperty } from "@nestjs/swagger"

export class UserDTO {
    @ApiProperty({
        description: 'Nome de um usuário',
        example: 'João Pedro',
    })
    name: string

    @ApiProperty({
        description: 'Email de um usuário',
        example: 'joao@gmail.com',
    })
    email: string

    @ApiProperty({
        description: 'Senha de um usuário',
        example: 'joao123',
    })
    password: string
}