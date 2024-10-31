import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get() // Obtener todos los libros.
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':isbn') //Obtener el detalle de un libro específico.
  async findOne(@Param('isbn') isbn: string) {
    return this.booksService.findOne(isbn);
  }

  @Post() //Registrar un libro.
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Patch(':isbn')
  async update(@Param('isbn') isbn: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(isbn, updateBookDto);
  }

  @Delete(':isbn')
  async remove(@Param('isbn') isbn: string) {
    await this.booksService.remove(isbn);
  }
}
