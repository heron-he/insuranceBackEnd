import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { menuConvertToTree } from '@/common/utils/lodash';

@Injectable()
export class MenuService {
    constructor(@InjectRepository(Menu) private readonly menuRes: Repository<Menu>) { }

    async create(createMenuDto: CreateMenuDto, user: Record<string, any>) {
        const menu = this.menuRes.create({ ...createMenuDto, createUser: user['username'] });
        const res = await this.menuRes.save(menu);
        console.log('create menu res', res);
        console.log('----------------------------');
        return res;
    }

    async findAll() {
        const res = await this.menuRes.find({ where: { deleted: 0 } });
        if (res.length <= 0) {
            return
        }
        // 将结果转换为树形结构,使用lodash
        const tree = menuConvertToTree(res, 0);
        console.log('find all menu res', res);
        console.log('find all menu tree', tree);
        console.log('----------------------------');
        return tree;
    }

    async update(id: number, updateMenuDto: UpdateMenuDto, user: Record<string, any>) {
        const data = await this.menuRes.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
        }
        data.name = updateMenuDto.name;
        data.parentId = updateMenuDto.parentId;
        data.type = updateMenuDto.type;
        data.icon = updateMenuDto.icon;
        data.component = updateMenuDto.component;
        data.orderNum = updateMenuDto.orderNum;
        data.updateUser = user['username'];
        const res = await this.menuRes.save(data);
        console.log('update menu res', res);
        console.log('----------------------------');
        return {
            message: '更新成功',
        };
    }

    async remove(id: number, user: Record<string, any>) {
        const data = await this.menuRes.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
        }
        if (data.deleted) {
            throw new HttpException('菜单已删除', HttpStatus.BAD_REQUEST);
        }
        data.deleted = 1;
        data.updateUser = user['username'];
        data.deleteTime = Date.now();
        const res = await this.menuRes.save(data);
        console.log('delete menu res', res);
        console.log('----------------------------');
        return {
            message: '删除成功',
        };
    }

    findOne(number: number) {
        const data = this.menuRes.findOne({ where: { id: number } });
        console.log('find one menu res', data);
        console.log('----------------------------');
        if (!data) {
            throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    async findByIds(menuIds: number[]) {
        const res = [];
        for (const menuId of menuIds) {
            const data = await this.menuRes.findOne({ where: { id: menuId, deleted: 0 } });
            res.push(data);
        }
        return res;
    }
}
