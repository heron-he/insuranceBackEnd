import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('login')
    @ApiOperation({ summary: '用户登录' })
    @UseGuards(AuthGuard('local'))
    //@UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() user: UserDto) {
        // 在进入这个方法之前，local.strategy.ts 已经验证了用户的账号密码
        console.log('auth.controller.ts login', user);
        console.log('---------------------------');
        return await this.authService.login(user);
    }

    @Post('register')
    @ApiOperation({ summary: '用户注册' })
    async register(@Body() user: UserDto) {
        console.log('auth.controller.ts register', user);
        console.log('---------------------------');
        return await this.userService.create(user, { username: 'register' });
    }
}
