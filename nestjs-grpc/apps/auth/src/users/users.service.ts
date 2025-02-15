import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  Users,
} from '@app/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i < 10; i++) {
      this.create({
        username: `user-${i}`,
        password: `password-${i}`,
        age: i,
      });
    }
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): Users {
    console.log('findAll');
    return { users: this.users };
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    return this.users[userIndex];
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    return this.users.splice(userIndex, 1)[0];
  }

  queryUsers(request: Observable<PaginationDto>): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (value: PaginationDto) => {
      const start = value.page * value.skip;
      subject.next({ users: this.users.slice(start, start + value.skip) });
    };
    const onComplete = () => subject.complete();
    request.subscribe({
      next: onNext,
      complete: onComplete,
    });
    return subject.asObservable();
  }
}
