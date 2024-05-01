import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggerInterceptor } from './common/interceptors/logging.interceptor';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),JwtModule.register({global: true}) ,
    DatabaseModule, UsersModule, BooksModule],
  providers:[
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers:[AppController]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
     consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
