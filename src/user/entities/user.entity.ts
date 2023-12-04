import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as Bcrypt from '../../common/utils/bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

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
        default: 3,
    })
    role: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createTime: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateTime: Date;

    @BeforeInsert()
    onBeforeInsert() {
        this.password = Bcrypt.hash(this.password);
        this.createTime = new Date();
    }

    @BeforeUpdate()
    async onBeforeUpdate() {
        this.updateTime = new Date();
    }
}
