import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBooksByUserDto } from './dto/get-books-by-user.dto';
import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Body() userDto: GetBooksByUserDto) {
    return this.booksService.findAll(userDto.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data =await this.booksService.remove(+id);
    if(data.affected > 0){
      return {success: true}
    }
    else{
      throw new CustomBadRequestException("No book exists with such id")
    }
  }
}
