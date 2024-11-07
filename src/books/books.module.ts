import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './services/books.service';
import { BooksController } from './controllers/books.controller';
import { Book } from './entities/book.entity';
import { BookResolver } from './resolvers/books.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService,BookResolver],
  exports: [BooksService],
  
})
export class BooksModule {}
