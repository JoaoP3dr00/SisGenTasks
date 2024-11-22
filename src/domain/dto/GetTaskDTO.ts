import { ApiProperty } from "@nestjs/swagger";

export class GetTaskDTO {
    @ApiProperty()
    id: number
}