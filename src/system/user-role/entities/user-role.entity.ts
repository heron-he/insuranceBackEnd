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
        this.createTime = new Date();
    }

    @BeforeUpdate()
    onBeforeUpdate() {
        this.updateTime = new Date();
    }
}
