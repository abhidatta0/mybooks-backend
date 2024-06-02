import { Min } from 'class-validator';
import { CreateBookDto } from './create-book.dto';
import { PartialType,OmitType } from '@nestjs/mapped-types';

export class UpdateBookDto  extends PartialType(OmitType(CreateBookDto,['user_id','total_number_of_pages'])){
    @Min(1)
    number_of_pages_read: number;
}
