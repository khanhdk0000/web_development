import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  async validateUser(username: string, password: string) {
    const userDb = await this.userService.findUser(username);
    if (userDb && userDb.password === password) {
      console.log(userDb);
    }
    return userDb;
  }
}
