import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator'
import Global from './Global';

@Entity('admin')
export default class Admin extends Global {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  @IsNotEmpty({ message: 'Fill this field' })
  @IsAlphanumeric('en-US', {
    message: 'The password must contain letters and/or numbers'
  })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}
