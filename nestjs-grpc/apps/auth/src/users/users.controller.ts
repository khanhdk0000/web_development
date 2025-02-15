import { Controller } from '@nestjs/common';
import { UserService } from './users.service';
import {
  UserServiceController,
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  PaginationDto,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
export class UsersController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  findAllUsers() {
    return this.userService.findAll();
  }

  findUserById(findOneUserDto: FindOneUserDto) {
    return this.userService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.userService.remove(findOneUserDto.id);
  }

  queryUsers(request: Observable<PaginationDto>) {
    return this.userService.queryUsers(request);
  }
}
