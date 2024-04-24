import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import {tap} from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler){
        console.log("Before...");
        const now = Date.now()
        return next.handle().pipe(tap(()=> console.log(`After...${Date.now()-now}ms`)))
    }
}