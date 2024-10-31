import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isbn: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  @Column()
  cover: string;

  @Column()
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
