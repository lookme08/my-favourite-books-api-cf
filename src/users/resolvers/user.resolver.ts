import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //Consultas para obtener todos los usuarios y un usuario específico por ID
  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  //Mutación para crear un nuevo usuario
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }
}
