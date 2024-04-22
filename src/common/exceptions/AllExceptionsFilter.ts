import {ExceptionFilter, Catch,ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    constructor(private readonly httpAdapterHost: HttpAdapterHost){}

    catch(exception: unknown, host: ArgumentsHost) {
        const {httpAdapter} = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof HttpException ? this.getMessage(exception) : 'error';

        const responseBody = {
            message: message,
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest())
        }
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    }

    private getMessage(error: HttpException){
        const eResponse = error.getResponse() as (string|Record<string,unknown>);
        if(typeof eResponse !== 'string' && eResponse.message && Array.isArray(eResponse.message) && eResponse.message.length > 0){
         const normalizedErrorMessage = eResponse.message.map(val => val).join(',');
         return normalizedErrorMessage;
        }
        return error.message;
      }
}