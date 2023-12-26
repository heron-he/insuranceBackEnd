import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RoleMenuService } from './role-menu.service';
import { CreateRoleMenuDto } from './dto/create-role-menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role-menu.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('role-menu')
@UseGuards(AuthGuard('jwt'))
@ApiTags('角色菜单')
export class RoleMenuController {
    constructor(private readonly roleMenuService: RoleMenuService) {}

    @Post()
    create(@Body() createRoleMenuDto: CreateRoleMenuDto, @Req() req: any) {
        const { user = {} } = req;
        return this.roleMenuService.create(createRoleMenuDto, user);
    }

    @Get()
    findAll() {
        return this.roleMenuService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roleMenuService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleMenuDto: UpdateRoleMenuDto, @Req() req: any) {
        const { user = {} } = req;
        return this.roleMenuService.update(+id, updateRoleMenuDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        const { user = {} } = req;
        return this.roleMenuService.remove(+id, user);
    }
}
