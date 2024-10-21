import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { correo, clave }: LoginDto) {
    return await this.authService.validateUser(correo, clave);
  }

  @Post('register')
  async register(@Body() dto: CreateUsuarioDto) {
    return await this.authService.register(dto);
  }
}
