import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
    @ApiProperty()
    nick: string;

    @ApiProperty()
    message: string;
}
