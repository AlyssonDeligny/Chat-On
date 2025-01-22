import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { pseudo: string; email: string; password: string }) {
    console.log('📥 Received Body:', body);
    return this.usersService.createUser(body.pseudo, body.email, body.password);
  }

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }
}
