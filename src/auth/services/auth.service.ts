import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(email: string, password: string) {
    // Aquí  validar el usuario 
    if (email === 'cynthiaflores8088@gmail.com' && password === '123456789') {
      const payload = { email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(email: string, password: string) {
    // Aquí  guardar el usuario en la base de datos 
    return { message: 'User registered successfully' };
  }
}
