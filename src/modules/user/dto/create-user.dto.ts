import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString({ message: "username必填" })
    username: string;
    @ApiPropertyOptional()
    nickname?: string;
    @ApiProperty()
    @IsString({ message: 'password必填' })
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
