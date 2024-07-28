import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateMenuDto {
    @ApiPropertyOptional()
    parentId?: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    type: number;
    @ApiPropertyOptional()
    icon?: string;
    @ApiPropertyOptional()
    component?: string;
    @ApiPropertyOptional()
    orderNum?: number;
}
