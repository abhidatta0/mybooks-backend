import { Column, ManyToOne , JoinColumn, Entity, Timestamp, BeforeUpdate} from "typeorm";
import BaseEntity from "src/common/entities/BaseEntity";
import { User } from "src/users/entities/user.entity";

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

   @Column({ type: "timestamp", nullable: true})
   previous_updated: Timestamp;

   @BeforeUpdate()
    updatePreviousUpdated() {
      this.previous_updated = this.updated_at;
    }
}
