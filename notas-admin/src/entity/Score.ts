import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Student from './Student';

@Entity('score')
export default class Score {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(type => Student, (student) => student.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'idStudent', referencedColumnName: 'id' })
  idStudent!: Student;

  @Column()
  n1!: number;

  @Column()
  n2!: number;

  @Column()
  n3!: number;

  @Column()
  n4!: number;
}
