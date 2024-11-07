import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsService } from '../services/collections.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { Book } from '../../books/entities/book.entity';
import { Repository } from 'typeorm';

describe('CollectionsService', () => {
  let service: CollectionsService;
  let collectionsRepository: Repository<Collection>;
  let booksRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionsService,
        {
          provide: getRepositoryToken(Collection),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CollectionsService>(CollectionsService);
    collectionsRepository = module.get<Repository<Collection>>(getRepositoryToken(Collection));
    booksRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of collections', async () => {
    jest.spyOn(collectionsRepository, 'find').mockResolvedValue([]);
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
  });
});
