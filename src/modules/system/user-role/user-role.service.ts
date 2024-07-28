import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRoleService {
    constructor(@InjectRepository(UserRole) private readonly userRoleRes: Repository<UserRole>) {}

    async create(createUserRoleDto: CreateUserRoleDto, user?: Record<string, any>) {
        const existed = await this.userRoleRes.findOne({
            where: {
                roleId: createUserRoleDto.roleId,
                userId: createUserRoleDto.userId,
            },
        });
        if (existed?.id) {
            throw new HttpException('该项已存在', HttpStatus.BAD_REQUEST);
        }
        const userRole = this.userRoleRes.create({ ...createUserRoleDto, createUser: user['username'] });
        const res = await this.userRoleRes.save(userRole);
        console.log('create userRole res', res);
        console.log('----------------------------');
        return res;
    }

    async findAll() {
        const res = await this.userRoleRes.find({ where: { deleted: 0 } });
        console.log('find all userRole res', res);
        console.log('----------------------------');
        return res;
    }

    async findOne(number: number) {
        const data = await this.userRoleRes.findOne({ where: { id: number } });
        console.log('find one userRole res', data);
        console.log('----------------------------');
        if (!data) {
            throw new HttpException('该项不存在', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    async findByUserId(userId: string) {
        const data = await this.userRoleRes.find({ where: { userId, deleted: 0 } });
        console.log('find one userRole res', data);
        console.log('----------------------------');
        if (!data) {
            throw new HttpException('该项不存在', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    async update(id: number, updateMenuDto: UpdateUserRoleDto, user: Record<string, any>) {
        const data = await this.userRoleRes.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('该项不存在', HttpStatus.BAD_REQUEST);
        }
        data.roleId = updateMenuDto.roleId;
        data.userId = updateMenuDto.userId;
        data.updateUser = user['username'];
        const res = await this.userRoleRes.save(data);
        console.log('update userRole res', res);
        console.log('----------------------------');
        return {
            message: '更新成功',
        };
    }

    async remove(id: number, user: Record<string, any>) {
        const data = await this.userRoleRes.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('该项不存在', HttpStatus.BAD_REQUEST);
        }
        if (data.deleted) {
            throw new HttpException('该项已删除', HttpStatus.BAD_REQUEST);
        }
        data.deleted = 1;
        data.updateUser = user['username'];
        data.deleteTime = Date.now();
        const res = await this.userRoleRes.save(data);
        console.log('delete userRole res', res);
        console.log('----------------------------');
        return {
            message: '删除成功',
        };
    }

    async removeByUserId(userId: string) {
        const all = await this.userRoleRes.find({ where: { userId } });
        let count = 0;
        if (all?.length > 0) {
            for (const userRole of all) {
                const data = await this.userRoleRes.update(userRole.id, { deleted: 1, deleteTime: Date.now() });
                if (data?.affected > 0) {
                    count++;
                }
            }
        }
        return `删除了${count}条数据`;
    }
}
