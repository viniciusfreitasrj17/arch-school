import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import Global from "./Global"

@Entity()
export class User extends Global {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}
