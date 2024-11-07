import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthResolver } from './resolvers/auth.resolver';


@Module({
  imports: [
    JwtModule.register({
      secret: '123456789',  //Provisiona, Cambiarlo por una clave mas segura
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService,AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}

