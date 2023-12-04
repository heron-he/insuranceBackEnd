import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Response } from './common/decorators/response';
import { HttpFilter } from './common/filters/globalError';
import { AuthGuardGuard } from './auth/auth.guard.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    // swagger config
    const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('小星保险接口文档')
        .setDescription('专为小星提供')
        .setVersion('1')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api-docs-star', app, document);

    // 全局响应拦截器
    app.useGlobalInterceptors(new Response());
    // 全局错误过滤器
    app.useGlobalFilters(new HttpFilter());
    app.useGlobalGuards(new AuthGuardGuard());

    await app.listen(9080);
}

bootstrap();
