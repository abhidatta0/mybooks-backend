import BaseEntity from "src/common/entities/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class User extends BaseEntity{

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

}
