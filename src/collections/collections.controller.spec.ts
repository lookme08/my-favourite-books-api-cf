import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';

describe('CollectionsController', () => {
  let controller: CollectionsController;
  let service: CollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionsController],
      providers: [
        {
          provide: CollectionsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
            addBookToCollection: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<CollectionsController>(CollectionsController);
    service = module.get<CollectionsService>(CollectionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of collections', async () => {
    const result = await controller.findAll();
    expect(result).toBeInstanceOf(Array);
  });
});
