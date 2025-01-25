import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ChatController],
  imports: [AuthModule],
})
export class ChatModule {}
