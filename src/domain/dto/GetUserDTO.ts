import { ApiProperty } from "@nestjs/swagger";

export class GetUserDTO {
    @ApiProperty()
    id: number
}