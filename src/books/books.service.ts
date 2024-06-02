import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService{
  constructor(private readonly bookRepository: BooksRepository){}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.create(createBookDto);
  }

  findAll(userId: number) {
    return this.bookRepository.findAll({user_id: userId});
  }

  findOne(id: number) {
    return this.bookRepository.findOneWhere({id});
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    if(!book){
      throw new CustomBadRequestException("This book doesnot exist!");
    }
    if(!updateBookDto.total_number_of_pages && book.total_number_of_pages < updateBookDto.number_of_pages_read){
      throw new CustomBadRequestException("This action is invalid");
    }
    if(updateBookDto.total_number_of_pages && updateBookDto.total_number_of_pages < updateBookDto.number_of_pages_read){
      throw new CustomBadRequestException("This action is invalid");
    }
    await this.bookRepository.updateOne({id} ,updateBookDto );
    return this.findOne(id);
  }

  remove(id: number) {
    return this.bookRepository.delete({id});

  }
}
