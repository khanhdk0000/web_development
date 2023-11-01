import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParam } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}
  findUsers() {}
  // createUsers(params: CreateUserParam) {
  //   const newUser = this.user;
  // }
}
