import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('role')
@UseGuards(AuthGuard('jwt'))
@ApiTags('角色管理')
@ApiBearerAuth()
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto, @Req() req: any) {
        const { user = {} } = req;
        return this.roleService.create(createRoleDto, user);
    }

    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Req() req: any) {
        const { user = {} } = req;
        return this.roleService.update(+id, updateRoleDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        const { user = {} } = req;
        return this.roleService.remove(+id, user);
    }
}
