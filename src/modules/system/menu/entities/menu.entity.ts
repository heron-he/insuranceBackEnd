import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        comment: '父菜单ID，一级菜单为0',
        default: 0,
    })
    parentId: number;

    @Column({
        length: 20,
        comment: '菜单名称',
    })
    name: string;

    @Column({
        comment: '类型 01-目录 02-菜单 03-按钮',
    })
    type: number;

    @Column({
        length: 50,
        nullable: true,
        comment: '菜单图标',
    })
    icon: string;

    @Column({
        length: 50,
        nullable: true,
        comment: '组件',
    })
    component: string;

    @Column({
        nullable: true,
        comment: '排序规则',
    })
    orderNum: number;

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
