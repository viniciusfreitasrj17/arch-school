import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';
import { Entity, Column, OneToMany } from 'typeorm';
import Global from './Global';
import Score from './Score';

@Entity('student')
export default class Student extends Global {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  @IsNotEmpty({ message: 'Fill this field' })
  email!: string;

  @Column({ select: false })
  @IsNotEmpty({ message: 'Fill this field' })
  @IsAlphanumeric('en-US', {
    message: 'The password must contain letters and/or numbers'
  })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @OneToMany(type => Score, (score) => score.id_student, {
    cascade: true,
    eager: true,
  })
  scores!: Score[];
}
