import { MinLength,IsEmail } from "class-validator";

export class CreateUserDto {
    @MinLength(8)
    password: string;

    @IsEmail()
    email: string;

    @MinLength(3)
    username: string;
}
