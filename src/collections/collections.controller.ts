import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get() //Lista todas las colecciones
  async findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':id') //Obtener el detalle de una colecció
  async findOne(@Param('id') id: number) {
    return this.collectionsService.findOne(id);
  }

  @Get(':id/items') //Obtener los libros de una colección
  async findItems(@Param('id') id: number) {
    return this.collectionsService.findItems(id);
  }

  @Post()  //Registrar una nueva colección.
  async create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.collectionsService.remove(id);
  }

  @Post(':id/add-book')
  async addBookToCollection(@Param('id') id: number, @Body('bookId') bookId: number) {
    return this.collectionsService.addBookToCollection(id, bookId);
  }
}

