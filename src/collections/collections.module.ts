import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsService } from './services/collections.service';
import { CollectionsController } from './controllers/collections.controller';
import { Collection } from './entities/collection.entity';
import { Book } from '../books/entities/book.entity';
import { CollectionResolver } from './resolvers/collections.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Collection, Book])],
  controllers: [CollectionsController],
  providers: [CollectionsService,CollectionResolver],
  exports: [CollectionsService],
})
export class CollectionsModule {}
