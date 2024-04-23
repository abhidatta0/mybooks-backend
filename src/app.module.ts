import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),JwtModule.register({global: true}) ,
    DatabaseModule, UsersModule, BooksModule],
  providers:[
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
     consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
