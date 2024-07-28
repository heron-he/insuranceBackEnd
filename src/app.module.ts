import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from '@/modules/system/role/role.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { UserRoleModule } from '@/modules/system/user-role/user-role.module';
import { RoleMenuModule } from '@/modules/system/role-menu/role-menu.module';
import envConfig from '../config/env';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // 设置为全局
            envFilePath: [envConfig.path],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql', // 数据库类型
                host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
                port: configService.get<number>('DB_PORT', 3306), // 端口号
                username: configService.get('DB_USER', 'root'), // 用户名
                password: configService.get('DB_PASSWORD', 'root'), // 密码
                database: configService.get('DB_DATABASE', 'blog'), //数据库名
                timezone: '+08:00', //服务器上配置的时区
                synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
                entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
                retryDelay: 500, //重试连接数据库间隔
                retryAttempts: 10, //重试连接数据库的次数
                autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
            }),
        }),
        UserModule,
        AuthModule,
        RoleModule,
        MenuModule,
        UserRoleModule,
        RoleMenuModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
