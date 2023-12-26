import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column({
        length: 100,
        nullable: true,
    })
    description: string;

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
