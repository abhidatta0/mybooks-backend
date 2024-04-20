import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),JwtModule.register({global: true}) ,
    DatabaseModule, UsersModule, BooksModule]
})
export class AppModule {}
