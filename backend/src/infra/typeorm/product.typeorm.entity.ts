import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductTypeormEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'decimal' })
    price: number;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;
}