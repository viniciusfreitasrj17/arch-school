import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('score')
export default class Score {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  n1!: number;

  @Column()
  n2!: number;

  @Column()
  n3!: number;

  @Column()
  n4!: number;
}
