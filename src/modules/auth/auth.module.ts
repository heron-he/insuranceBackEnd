import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

const jwtModule = JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory(configService: ConfigService) {
        const jwt = configService.get('jwt')
        return {
            secret: jwt.secret,
            signOptions: {
                expiresIn: jwt.expiresIn,
            },
        };
    },
});

@Module({
    imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule, UserModule],
    exports: [jwtModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStorage, JwtStrategy],
})
export class AuthModule { }
