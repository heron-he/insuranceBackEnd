import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleMenuDto } from './dto/create-role-menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role-menu.dto';
import { RoleMenu } from './entities/role-menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { convertToTree } from '../../common/utils/lodash';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class RoleMenuService {
    constructor(
        @InjectRepository(RoleMenu) private readonly roleMenuRes: Repository<RoleMenu>,
        private readonly menuService: MenuService,
    ) {}

    async create(createUserRoleDto: CreateRoleMenuDto, user: Record<string, any>) {
        const existed = await this.roleMenuRes.findOne({
            where: {
                roleId: createUserRoleDto.roleId,
                menuId: createUserRoleDto.menuId,
            },
        });
        if (existed?.id) {
            throw new HttpException('该项已存在', HttpStatus.BAD_REQUEST);
        }
        const userRole = this.roleMenuRes.create({ ...createUserRoleDto, createUser: user['username'] });
        const res = await this.roleMenuRes.save(userRole);
        console.log('create userRole res', res);
        console.log('----------------------------');
        return res;
    }

    async findAll() {
        const res = await this.roleMenuRes.find({ where: { deleted: 0 } });
        console.log('find all userRole res', res);
        console.log('----------------------------');
        return res;
    }

    async findOne(number: number) {
        const data = await this.roleMenuRes.findOne({ where: { id: number } });
        console.log('find one userRole res', data);
        console.log('----------------------------');
        if (!data) {
            throw new HttpException('该项不存在', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    async update(id: number, updateMenuDto: UpdateRoleMenuDto, user: Record<string, any>) {
        const data = await this.roleMenuRes.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('该项不存在', HttpStatus.BAD_REQUEST);
        }
        data.roleId = updateMenuDto.roleId;
        data.menuId = updateMenuDto.menuId;
        data.updateUser = user['username'];
        const res = await this.roleMenuRes.save(data);
        console.log('update userRole res', res);
        console.log('----------------------------');
        return {
            message: '更新成功',
        };
    }

    async remove(id: number, user: Record<string, any>) {
        const data = await this.roleMenuRes.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('该项不存在', HttpStatus.BAD_REQUEST);
        }
        if (data.deleted) {
            throw new HttpException('该项已删除', HttpStatus.BAD_REQUEST);
        }
        data.deleted = 1;
        data.updateUser = user['username'];
        data.deleteTime = new Date();
        const res = await this.roleMenuRes.save(data);
        console.log('delete userRole res', res);
        console.log('----------------------------');
        return {
            message: '删除成功',
        };
    }

    async findByRoleIds(roleIds: number[]) {
        const res = [];
        for (const roleId of roleIds) {
            const data = await this.roleMenuRes.find({ where: { roleId: roleId, deleted: 0 } });
            res.push(...data);
        }
        // 去重
        const menuIds = [...new Set(res.map((item) => item.menuId))];
        // 查找具体的菜单
        const menus = await this.menuService.findByIds(menuIds);
        return convertToTree(menus, 0) as any[];
    }
}
