import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as Bcrypt from '@/common/utils/bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
        unique: true,
    })
    username: string;

    @Column({
        length: 100,
        nullable: true,
    })
    nickname: string;

    @Column({
        length: 100,
        select: false,
    })
    password: string;

    @Column({
        length: 100,
        nullable: true,
    })
    phone: string;

    @Column({
        length: 100,
        nullable: true,
    })
    email: string;

    @Column({
        length: 100,
        nullable: true,
    })
    avatar: string;

    @Column({
        name: 'create_time',
        type: 'bigint',
        nullable: true,
    })
    createTime: number;

    @Column({
        name: 'update_time',
        type: 'bigint',
        nullable: true,
    })
    updateTime: number;

    @Column({
        name: 'delete_time',
        type: 'bigint',
        nullable: true,
    })
    deleteTime: number;

    @Column({
        nullable: true,
    })
    createUser: string;

    @Column({
        nullable: true,
    })
    updateUser: string;

    @Column({
        nullable: true,
        default: 0,
    })
    deleted: number;

    @BeforeInsert()
    onBeforeInsert() {
        this.password = Bcrypt.hash(this.password);
        this.createTime = Date.now();
    }

    @BeforeUpdate()
    onBeforeUpdate() {
        this.updateTime = Date.now();
    }
}
