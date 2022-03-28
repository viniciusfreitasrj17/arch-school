import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('student')
export default class Student {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;
}
