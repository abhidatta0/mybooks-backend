import { Min } from 'class-validator';

export class UpdateBookDto  {
    @Min(1)
    number_of_pages_read: number;
}
