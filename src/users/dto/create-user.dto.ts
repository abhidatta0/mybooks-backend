import { MinLength } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

export class CreateUserDto extends LoginUserDto{
    @MinLength(3)
    username: string;
}
