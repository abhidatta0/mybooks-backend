import AbstractRepository from "src/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { Book } from './entities/book.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class BooksRepository extends AbstractRepository<Book>{
    protected readonly logger = new Logger(Book.name);

    constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>){
        super(bookRepository)
    }

}