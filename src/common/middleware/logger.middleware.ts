import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
   use(request: Request, response: Response, next:NextFunction){
    console.log("Request logging...",request.originalUrl, request.method);
    next();
   }
}