import { IsNumber } from "class-validator";

export class GetBooksByUserDto {
    @IsNumber()
    user_id: number;
}