import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRoleModule } from '../system/user-role/user-role.module';
import { RoleMenuModule } from '../system/role-menu/role-menu.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UserRoleModule, RoleMenuModule],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
