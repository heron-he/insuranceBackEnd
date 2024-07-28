import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UserDto {
    @Expose()
    @ApiProperty()
    username: string;
    @Exclude()
    @ApiPropertyOptional()
    password: string;
}
