import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    username: string;
    @ApiPropertyOptional()
    nickname?: string;
    @ApiProperty()
    password: string;
    @ApiPropertyOptional()
    phone?: string;
    @ApiPropertyOptional()
    email?: string;
    @ApiPropertyOptional()
    avatar?: string;
    @ApiPropertyOptional()
    roles?: number[];
}
