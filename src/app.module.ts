import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configs from './config/index';
import { IndexMoudles } from './modules/index.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // 设置为全局
            load: [...Configs]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.get("DATABASE_CONFIG"),
        }),
        IndexMoudles,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
