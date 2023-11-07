import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';
import { compareHashPassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  async validateUser(username: string, password: string) {
    const userDb = await this.userService.findUser(username);
    if (userDb) {
      const matched = compareHashPassword(password, userDb.password);
      if (matched) {
        return userDb;
      } else {
        return null;
      }
      console.log(userDb);
    }
    return userDb;
  }
}
