import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  fetchUsers() {
    return { name: 'haha' };
  }
}
