import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(isbn: string): Promise<Book> {
    return this.booksRepository.findOne({ where: { isbn } });
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(newBook);
  }

  async update(isbn: string, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.booksRepository.update({ isbn }, updateBookDto);
    return this.booksRepository.findOne({ where: { isbn } });
  }

  async remove(isbn: string): Promise<void> {
    await this.booksRepository.delete({ isbn });
  }
}


