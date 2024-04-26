import AbstractRepository from "src/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { User } from './entities/user.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UsersRepository extends AbstractRepository<User>{
    protected readonly logger = new Logger(User.name);

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){
        super(userRepository)
    }

}