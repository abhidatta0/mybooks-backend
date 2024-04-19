import { MinLength,IsEmail } from "class-validator";

export class CreateUserDto {
    @MinLength(8)
    password: string;

    @IsEmail()
    email_id: string;

    @MinLength(3)
    username: string;
}
