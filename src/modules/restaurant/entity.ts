import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  place_name: string;

  @Column({ type: 'varchar', nullable: false })
  category_name: string;

  @Column({ type: 'integer', nullable: false })
  distance: number;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  place_url: string;

  @Column({ type: 'varchar', nullable: false })
  x: string;

  @Column({ type: 'varchar', nullable: false })
  y: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
