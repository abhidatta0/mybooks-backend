import { MinLength,IsEmail } from "class-validator";

export class LoginUserDto {
    @MinLength(8)
    password: string;

    @IsEmail()
    email: string;
}
