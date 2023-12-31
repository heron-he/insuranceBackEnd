import { compare } from '../common/utils/bcrypt';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 *  登录验证策略
 */
export class LocalStorage extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        } as IStrategyOptions);
    }

    async validate(username: string, password: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .addSelect('user.password')
            .getOne();
        if (!user) {
            throw new BadRequestException('用户名不正确！');
        }
        if (!compare(password, user.password)) {
            throw new BadRequestException('密码错误！');
        }
        return user;
    }
}
