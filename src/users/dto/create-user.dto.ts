import { IsString, Length,IsEmail } from "class-validator";

export class CreateUserDto {
    @Length(10)
    @IsString()
    phone_number: string;

    @IsEmail()
    email_id: string;
}
