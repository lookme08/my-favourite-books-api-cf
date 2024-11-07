import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { Book } from '../../books/entities/book.entity';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { UpdateCollectionDto } from '../dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
    
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Collection[]> {
    return this.collectionsRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Collection> {
    const collection = await this.collectionsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    
    if (!collection) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }
    return collection;
  }
  

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const newCollection = this.collectionsRepository.create(createCollectionDto);
    return this.collectionsRepository.save(newCollection);
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto): Promise<Collection> {
    await this.collectionsRepository.update(id, updateCollectionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.collectionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }
  }

  async addBookToCollection(collectionId: number, bookId: number): Promise<Collection> {
    const collection = await this.findOne(collectionId);
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
    });
  
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
  
    collection.books.push(book);
    return this.collectionsRepository.save(collection);
  }
  

// Método para encontrar los libros de una colección
async findItems(id: number): Promise<Book[]> {
  const collection = await this.collectionsRepository.findOne({
    where: { id },
    relations: ['books'],  // Asegura que cargue la relación con libros
  });

  if (!collection) {
    throw new NotFoundException(`Collection with ID ${id} not found`);
  }

  return collection.books; // Retorna los libros de la colección
}


}
