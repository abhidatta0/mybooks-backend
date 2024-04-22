import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomBadRequestException extends HttpException{
    constructor(message?:string){
        super(message ?? 'Something went wrong', HttpStatus.BAD_REQUEST)
    }
}