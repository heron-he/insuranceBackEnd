import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty()
    name: string;
    @ApiPropertyOptional()
    description: string;
}
