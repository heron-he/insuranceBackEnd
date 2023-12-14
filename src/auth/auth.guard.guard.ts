import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // context 请求的（Response/Request)的引用
        console.log('进入全局权限守卫...');
        // 获取请求头部数据
        const request = context.switchToHttp().getRequest();
        // 白名单验证
        if (this.hasUrl(this.urlList, request.url)) {
            return true;
        }
        return true;
    }

    // 白名单
    private urlList: string[] = ['/api/user/create'];

    // 验证请求是否为白名单的路由
    private hasUrl(urlList: string[], url: string): boolean {
        let flag: boolean = false;
        if (urlList.indexOf(url.split('?')[0]) >= 0) {
            flag = true;
        }
        return flag;
    }
}
