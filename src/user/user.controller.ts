import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    @ApiOperation({ summary: '创建用户' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Post('findAll')
    findAll(@Param() params?: Record<string, any>) {
        return this.userService.findAll(params);
    }

    @Get(':key')
    findOne(@Param('key') key: string) {
        return this.userService.findOne(key);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('updateData') updateData: UpdateUserDto) {
        return this.userService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
