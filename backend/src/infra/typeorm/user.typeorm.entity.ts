import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'email', type: 'varchar', unique: true })
    email: string;

    @Column({ name: 'password', type: 'varchar' })
    password: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}