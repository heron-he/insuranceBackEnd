import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async create(createUserDto: CreateUserDto) {
        // 对用户是否存在的判断
        const { username } = createUserDto;
        const findUser = await this.userRepository.findOne({ where: { username } });
        if (findUser?.id) {
            throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
        }
        const user = this.userRepository.create(createUserDto);
        const res = await this.userRepository.save(user);
        console.log('create user res', res);
        console.log('----------------------------');
        return res;
    }

    async findAll(query?: { keyword?: string; page?: number; pageSize?: number }) {
        const { keyword, page = 1, pageSize = 10 } = query;
        let where = [];
        if (keyword && keyword.trim() !== '') {
            where = [
                {
                    username: Like(`%${keyword}%`),
                },
                {
                    email: Like(`%${keyword}%`),
                },
                {
                    nickname: Like(`%${keyword}%`),
                },
            ];
        }
        const data = await this.userRepository.findAndCount({
            where,
            order: {
                createTime: 'DESC',
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        console.log('find all user res', data);
        console.log('----------------------------');
        if (!data[0].length) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    async findOne(key: string | number) {
        const data = await this.userRepository.findOne({
            where: [{ id: key as number }, { username: Like(`%${key}%`) }],
        });
        console.log('find one user res', data);
        console.log('----------------------------');
        if (!data) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const res = await this.userRepository.update(id, updateUserDto);
        console.log('update user res', res);
        console.log('----------------------------');
        if (res.affected === 0) {
            throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
        }
        return res;
    }

    async remove(id: string) {
        const res = await this.userRepository.delete(id);
        console.log('delete user res', res);
        console.log('----------------------------');
        if (res.affected === 0) {
            throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
        }
        return res;
    }
}
