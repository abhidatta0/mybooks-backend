import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService, private config: ConfigService, private reflector: Reflector){ }

    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        
        // allow public apis like login/register, 
        // Reference: https://docs.nestjs.com/security/authentication#enable-authentication-globally
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        const request = context.switchToHttp().getRequest();

        const accessToken = this.extractAccessTokenFromHeader(request);

        if (!accessToken) {
            throw new UnauthorizedException('Access Denied. No token provided.');
        }
        try{
            await this.jwtService.verifyAsync(accessToken, {secret: this.config.get('JWT_ACCESS_TOKEN_SECRET')});
        }catch{
            throw new UnauthorizedException('Access Denied. Token invalid'); // 401 response
        }
        return true;

    }

    private extractAccessTokenFromHeader(request: Request){
        const accessTokenCookie = request.cookies?.['access-token'];
        return accessTokenCookie; 
    }

}