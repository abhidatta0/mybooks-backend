import { IsNotEmpty, IsNumber, IsString, Min, IsOptional } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @Min(0)
    total_number_of_pages: number;

    @IsNumber()
    user_id: number;
}
