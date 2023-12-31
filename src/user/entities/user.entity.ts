import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as Bcrypt from '../../common/utils/bcrypt';

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
        type: 'timestamp',
        nullable: true,
    })
    createTime: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    updateTime: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    deleteTime: Date;

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
        this.createTime = new Date();
    }

    @BeforeUpdate()
    onBeforeUpdate() {
        this.updateTime = new Date();
    }
}
