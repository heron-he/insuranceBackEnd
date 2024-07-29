import { Module } from "@nestjs/common";
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { RoleModule } from '@/modules/system/role/role.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { UserRoleModule } from '@/modules/system/user-role/user-role.module';
import { RoleMenuModule } from '@/modules/system/role-menu/role-menu.module';

@Module({
    imports: [
        RoleModule,
        MenuModule,
        UserRoleModule,
        RoleMenuModule,
        UserModule,
        AuthModule,
    ],
    exports: [
        RoleModule,
        MenuModule,
        UserRoleModule,
        RoleMenuModule,
        UserModule,
        AuthModule,
    ],
})

export class IndexMoudles { }