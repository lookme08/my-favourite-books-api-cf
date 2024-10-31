import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsModule } from './collections/collections.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';



@Module({
  
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'booksdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    BooksModule,
    CollectionsModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],

    })

export class AppModule {}
