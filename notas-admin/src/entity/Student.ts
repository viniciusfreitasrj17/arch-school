import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Global from './Global';
import Score from './Score';

@Entity('student')
export default class Student extends Global {
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
