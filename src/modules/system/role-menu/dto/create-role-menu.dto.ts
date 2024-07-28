import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleMenuDto {
    @ApiProperty()
    roleId: number;
    @ApiProperty()
    menuId: number;
}
