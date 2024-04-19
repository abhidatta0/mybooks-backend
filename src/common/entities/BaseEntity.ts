import { PrimaryGeneratedColumn, CreateDateColumn , UpdateDateColumn,Timestamp} from "typeorm";

class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;
}

export default BaseEntity;