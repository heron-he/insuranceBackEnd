import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    roleId: number;
}
