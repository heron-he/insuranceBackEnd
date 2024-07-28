import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'uuid',
    })
    userId: string;

    @Column()
    roleId: number;

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
        this.createTime = Date.now();
    }

    @BeforeUpdate()
    onBeforeUpdate() {
        this.updateTime = Date.now();
    }
}
