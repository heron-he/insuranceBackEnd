import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 100,
    })
    username: string;

    @Column({
        length: 100,
    })
    nickname: string;

    @Column({
        length: 100,
    })
    password: string;

    @Column({
        length: 100,
    })
    email: string;

    @Column()
    role: number;
}
