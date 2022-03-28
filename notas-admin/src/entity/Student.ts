import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Score from './Score';

@Entity('student')
export default class Student {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @OneToMany(type => Score, (score) => score.idStudent, {
    cascade: true,
    eager: true,
  })
  scores!: Score[];
}
