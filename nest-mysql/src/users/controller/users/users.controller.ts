import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {}

  // @Post()
  // createUsers(@Body() createUserDto: CreateUserDto) {
  //   this.userService.createUsers();
  // }
}
