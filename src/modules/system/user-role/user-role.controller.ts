import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user-role')
@UseGuards(AuthGuard('jwt'))
@ApiTags('用户角色')
@ApiBearerAuth()
export class UserRoleController {
    constructor(private readonly userRoleService: UserRoleService) {}

    @Post()
    create(@Body() createUserRoleDto: CreateUserRoleDto, @Req() req: any) {
        const { user = {} } = req;
        return this.userRoleService.create(createUserRoleDto, user);
    }

    @Get()
    findAll() {
        return this.userRoleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userRoleService.findOne(+id);
    }

    @Get('user/:userId')
    findOneByUserId(@Param('userId') userId: string) {
        return this.userRoleService.findByUserId(userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto, @Req() req: any) {
        const { user = {} } = req;
        return this.userRoleService.update(+id, updateUserRoleDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        const { user = {} } = req;
        return this.userRoleService.remove(+id, user);
    }
}
