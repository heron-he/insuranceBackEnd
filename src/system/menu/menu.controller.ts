import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('menu')
@UseGuards(AuthGuard('jwt'))
@ApiTags('菜单')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post()
    create(@Body() createMenuDto: CreateMenuDto, @Req() req: any) {
        const { user = {} } = req;
        return this.menuService.create(createMenuDto, user);
    }

    @Get()
    findAll() {
        return this.menuService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.menuService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto, @Req() req: any) {
        const { user = {} } = req;
        return this.menuService.update(+id, updateMenuDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        const { user = {} } = req;
        return this.menuService.remove(+id, user);
    }
}
