import { PartialType } from '@nestjs/swagger';
import { CreateRoleMenuDto } from './create-role-menu.dto';

export class UpdateRoleMenuDto extends PartialType(CreateRoleMenuDto) {}
