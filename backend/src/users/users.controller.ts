import { Controller, Get, Post, Body, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { pseudo: string; email: string; password: string }) {
    console.log('📥 Received Body for creation:', body);
    return this.usersService.createUser(body.pseudo, body.email, body.password);
  }

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.usersService.deleteUser(id);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'User deleted successfully' };
  }
}
