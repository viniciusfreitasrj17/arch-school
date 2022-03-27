import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin')
export default class Admin {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;
}
