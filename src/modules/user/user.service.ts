import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { UserRoleService } from '../system/user-role/user-role.service';
import { RoleMenuService } from '../system/role-menu/role-menu.service';
import { CV } from '@/config/constantValue';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userRoleService: UserRoleService,
        private readonly roleMenuService: RoleMenuService,
    ) {}

    async create(createUserDto: CreateUserDto, curUser: Record<string, any>) {
        // 对用户是否存在的判断
        const { username } = createUserDto;
        const findUser = await this.userRepository.findOne({ where: [{ username }] });
        if (findUser?.id) {
            throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
        }
        try {
            const data = this.userRepository.create({ ...createUserDto, createUser: curUser?.username });
            const res = await this.userRepository.save(data);
            // 保存用户的角色
            const { roles = [] } = createUserDto;
            if (roles.length) {
                for (const role of roles) {
                    await this.userRoleService.create({ userId: res.id, roleId: role }, { user: curUser });
                }
            } else {
                // 普通用户默认角色
                await this.userRoleService.create({ userId: res.id, roleId: CV.DEFAULT_ROLE }, curUser);
            }
            console.log('create user res', res);
            console.log('----------------------------');
            return {
                message: '创建成功',
            };
        } catch (error) {
            console.log('create user error', error);
            console.log('----------------------------');
            throw new HttpException('创建失败', HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(query?: { keyword?: string; page?: number; pageSize?: number }) {
        const { keyword, page = 1, pageSize = 10 } = query;
        let where = [];
        if (keyword && keyword.trim() !== '') {
            where = [
                {
                    username: keyword,
                },
                {
                    phone: keyword,
                },
                {
                    email: Like(`%${keyword}%`),
                },
                {
                    nickname: Like(`%${keyword}%`),
                },
            ];
        }
        const data = await this.userRepository.find({
            where,
            order: {
                createTime: 'DESC',
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        console.log('find all user res', data);
        console.log('----------------------------');
        if (!data.length) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    async findOne(key: string | number) {
        const data = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id: key })
            .orWhere('user.username = :username', { username: key })
            .orWhere('user.phone = :phone', { phone: key })
            .getOne();
        console.log('find one user res', data);
        console.log('----------------------------');
        if (!data) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    async update(id: string, updateUserDto: UpdateUserDto, user: Record<string, any>) {
        const data = await this.userRepository.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }
        data.nickname = updateUserDto.nickname;
        data.phone = updateUserDto.phone;
        data.email = updateUserDto.email;
        data.avatar = updateUserDto.avatar;
        data.updateUser = user['username'];
        const res = await this.userRepository.save(data);
        console.log('update user res', res);
        console.log('----------------------------');
        return {
            message: '更新成功',
        };
    }

    async remove(id: string) {
        const data = await this.userRepository.findOne({ where: { id } });
        if (!data) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }
        if (data.deleted) {
            throw new HttpException('用户已删除', HttpStatus.BAD_REQUEST);
        }
        data.deleted = 1;
        data.deleteTime = Date.now();
        const res = await this.userRepository.save(data);
        if (res.id) {
            // 删除用户关联的角色
            const userRoleRes = await this.userRoleService.removeByUserId(res.id);
            console.log('delete userRole res', userRoleRes);
        }
        console.log('delete user res', res);
        console.log('----------------------------');
        return {
            message: '删除成功',
        };
    }

    // 查找用户的角色及角色所拥有的权限
    async findRoleAndPermission(id: string) {
        const roles = await this.userRoleService.findByUserId(id);
        if (!roles.length) {
            return [];
        }
        return await this.roleMenuService.findByRoleIds(roles.map((item) => item.roleId));
    }
}
