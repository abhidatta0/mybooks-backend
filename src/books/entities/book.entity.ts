import { Column, ManyToOne , JoinColumn, Entity} from "typeorm";
import BaseEntity from "../../common/entities/BaseEntity";
import { User } from "../../users/entities/user.entity";

@Entity("books")
export class Book extends BaseEntity{
   @Column()
   title: string

   @Column({nullable: true})
   description?:string;

   @Column()
   total_number_of_pages: number;

   @Column({default: 0})
   number_of_pages_read: number;

   @ManyToOne(()=> User, (user)=> user.id, {onDelete: 'CASCADE'})
   @JoinColumn({name:'user_id'})
   user: User;

   @Column()
   user_id: number;
}
