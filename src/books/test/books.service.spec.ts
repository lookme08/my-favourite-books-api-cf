import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../services/books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of books', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
  });
});
