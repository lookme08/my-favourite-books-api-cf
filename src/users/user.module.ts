import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService,UserResolver],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
