import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>){}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll(userId: number) {
    return this.bookRepository.find({where: {user_id: userId}});
  }

  findOne(id: number) {
    return this.bookRepository.findOne({where: {id}});
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    if(!book){
      throw new CustomBadRequestException("This book doesnot exist!");
    }
    if(book.total_number_of_pages <= updateBookDto.number_of_pages_read){
      throw new CustomBadRequestException("This action is invalid");
    }
    await this.bookRepository.update({id} ,updateBookDto );
    return this.findOne(id);
  }

  remove(id: number) {
    return this.bookRepository.delete({id});

  }
}
