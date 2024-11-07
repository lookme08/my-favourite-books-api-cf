import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/entities/user.entity';
import { UserModule } from './users/user.module';

import { Book } from './books/entities/book.entity';
import { BooksModule } from './books/books.module';

import { Collection } from './collections/entities/collection.entity';
import { CollectionsModule } from './collections/collections.module';

import { AuthModule } from './auth/auth.module';


import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [

     // Configuración de TypeORM para SQL Server
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'CYNTHIA\SQLEXPRESS', // Nombre de mi servidor
      //port: 1433,
      username: 'Cynthia Flores',
      password: '1510',
      database: 'BookStoreDB',
     
      options: {
        encrypt: false,
        trustServerCertificate: true, // Agrega esto si tu servidor no tiene un certificado SSL
      },
      extra: {
        options: {
          trustedConnection: true, // Habilita la autenticación de Windows
        },
      },

      // entities: [User, Book, Collection],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo. 
      
    }),


    // Otros módulos de la aplicación
    TypeOrmModule.forFeature([User, Book, Collection]),
    UserModule,
    BooksModule,
    CollectionsModule,
    AuthModule,  // Si tienes autenticación configurada

    // Configuración de GraphQL
    GraphQLModule.forRoot({
        autoSchemaFile: 'schema.gql',
    }),


  ],

  controllers: [AppController],
  providers: [AppService],

  
})
export class AppModule {}
