import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception.message || '服务器错误';
        const errorResponse = {
            code: status,
            message,
            data: exception.data,
            success: false,
            date: new Date().toLocaleString(),
            url: request.originalUrl,
        };
        response.status(status).json(errorResponse);
    }
}
