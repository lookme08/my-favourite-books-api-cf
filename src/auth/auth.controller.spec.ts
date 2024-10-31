import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'test-token' }), // Mock del método login
            register: jest.fn().mockResolvedValue({ message: 'User registered successfully' }), // Mock del método register
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an access token on login', async () => {
    const result = await controller.login('test@example.com', 'password');
    expect(result).toEqual({ access_token: 'test-token' });
    expect(service.login).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should return a success message on register', async () => {
    const result = await controller.register('test@example.com', 'password');
    expect(result).toEqual({ message: 'User registered successfully' });
    expect(service.register).toHaveBeenCalledWith('test@example.com', 'password');
  });
});
