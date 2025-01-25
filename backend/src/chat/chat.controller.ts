import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getChat() {
    return { message: 'Accès autorisé au chat' };
  }
}
