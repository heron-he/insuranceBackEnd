import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

const jwtModule = JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory(configService: ConfigService) {
        return {
            secret: configService.get('JWT_SECRET', 'heron64.'),
            signOptions: {
                expiresIn: configService.get('JWT_EXPIRES_IN', '1d'),
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
export class AuthModule {}
