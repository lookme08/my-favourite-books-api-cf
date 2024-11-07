import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CollectionsService } from '../services/collections.service';
import { Collection } from '../entities/collection.entity';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionsService) {}


  //Consultas para obtener todas las colecciones y una colección específica por ID.
  @Query(() => [Collection])
  async collections() {
    return this.collectionService.findAll();
  }

  @Query(() => Collection, { nullable: true })
  async collection(@Args('id', { type: () => Int }) id: number) {
    return this.collectionService.findOne(id);
  }

  //Mutación para crear una nueva colección
  @Mutation(() => Collection)
  async createCollection(@Args('name') name: string) {
    return this.collectionService.create({ name });
  }

  //Mutación para agregar un libro a una colección específica
  @Mutation(() => Collection)
  async addBookToCollection(
    @Args('collectionId', { type: () => Int }) collectionId: number,
    @Args('bookId', { type: () => Int }) bookId: number,
  ) {
    return this.collectionService.addBookToCollection(collectionId, bookId);
  }
}
