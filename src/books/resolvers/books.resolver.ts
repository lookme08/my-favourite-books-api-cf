import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/book.entity';

@Resolver(of => Book)
export class BookResolver {
  constructor(private booksService: BooksService) {}

  @Query(returns => [Book])
  async books() {
    return this.booksService.findAll();
  }

  @Mutation(() => Book)
  async createBook(
    @Args('title') title: string,
    @Args('author') author: string,
    @Args('isbn') isbn: string,
    @Args('price') price: number,
    @Args('category') category: string,
    @Args('cover') cover: string,
    @Args('url') url: string,
  ) {
    return this.booksService.create({ title, author, isbn, price, category, cover, url });
  }
}
