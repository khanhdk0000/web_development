import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../typeorm/entities/User';
import { UsersService } from '../../users/service/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE')
    private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: User) => void): any {
    console.log('serialize user');
    done(null, user);
  }

  async deserializeUser(
    payload: User,
    done: (err: Error, payload: User) => void,
  ) {
    console.log('deserialize user');
    const userDb = await this.usersService.findUserById(payload.id);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
