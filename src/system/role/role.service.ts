import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRes: Repository<Role>) {}

    async create(createRoleDto: CreateRoleDto, user: Record<string, any>) {
        const role = this.roleRes.create({ ...createRoleDto, createUser: user['username'] });
        const res = await this.roleRes.save(role);
        console.log('create role res', res);
        console.log('----------------------------');
        return res;
    }

    findAll() {
        const res = this.roleRes.find();
        console.log('find all role res', res);
        console.log('----------------------------');
        return res;
    }

    async update(id: number, updateRoleDto: UpdateRoleDto, user: Record<string, any>) {
        const data = await this.roleRes.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
        }
        data.name = updateRoleDto.name;
        data.updateUser = user['username'];
        data.description = updateRoleDto.description;
        const res = await this.roleRes.save(data);
        console.log('update role res', res);
        console.log('----------------------------');
        return {
            message: '更新成功',
        };
    }

    async remove(id: number, user: Record<string, any>) {
        if ([1, 3].includes(id)) {
            throw new HttpException('删除失败，系统默认角色无法删除', HttpStatus.BAD_REQUEST);
        }
        const data = await this.roleRes.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
        }
        if (data.deleted) {
            throw new HttpException('角色已删除', HttpStatus.BAD_REQUEST);
        }
        data.deleted = 1;
        data.updateUser = user['username'];
        data.deleteTime = new Date();
        const res = await this.roleRes.save(data);
        console.log('delete role res', res);
        console.log('----------------------------');
        return {
            message: '删除成功',
        };
    }
}
