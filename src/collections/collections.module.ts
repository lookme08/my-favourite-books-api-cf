import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { Collection } from './collection.entity';
import { Book } from '../books/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, Book])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
