import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    console.log('UserService initialized', this.userService);
  }

  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    console.log('findAllUsers');
    return this.userService.findAllUsers({});
  }

  findOne(id: string) {
    return this.userService.findUserById({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }

  emailUsers() {
    const users = new ReplaySubject<PaginationDto>();
    users.next({ page: 0, skip: 25 });
    users.next({ page: 1, skip: 25 });
    users.next({ page: 2, skip: 25 });
    users.next({ page: 3, skip: 25 });
    users.complete();
    this.userService.queryUsers(users).subscribe((users) => {
      console.log(users);
    });
  }
}
