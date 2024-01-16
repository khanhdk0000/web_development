import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from '../../dto/CreatePost.dto';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { UserProfileDto } from '../../dto/CreateUserProfile.dto';
import { UpdateUserDto } from '../../dto/UpdateUser.dto';
import { UsersService } from '../../service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Post()
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUsers(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfile: UserProfileDto,
  ) {
    return this.userService.createUserProfile(id, userProfile);
  }

  @Post(':id/posts')
  createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPost: CreatePostDto,
  ) {
    return this.userService.createPost(id, createPost);
  }
}
