import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import Global from './Global';
import Student from './Student';

@Entity('score')
export default class Score  extends Global {
  @ManyToOne(type => Student, (student) => student.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'id_student', referencedColumnName: 'id' })
  id_student!: Student;

  @Column()
  n1!: number;

  @Column()
  n2!: number;

  @Column()
  n3!: number;

  @Column()
  n4!: number;
}
