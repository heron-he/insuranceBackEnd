import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private readonly userRes: Repository<User>,
        private readonly userService: UserService,
    ) {}

    createToken(user: Partial<User>) {
        return this.jwtService.sign(user);
    }

    async login(user: Partial<User>) {
        // user 只有 username 和 password
        const dbUser = await this.userService.findOne(user.username);
        // 查找用户的角色及角色所拥有的权限
        const permission = await this.userService.findRoleAndPermission(dbUser.id);
        const token = this.createToken({
            id: dbUser.id,
            username: dbUser.username,
            nickname: dbUser.nickname,
        });
        return {
            token,
            permission,
            ...dbUser,
        };
    }
}
