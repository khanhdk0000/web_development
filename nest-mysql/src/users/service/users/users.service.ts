import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../typeorm/entities/Posts';
import { Profile } from '../../../typeorm/entities/Profile';
import { User } from '../../../typeorm/entities/User';
import { encodePassword } from '../../../utils/bcrypt';
import {
  CreatePostParam,
  CreateUserParam,
  UpdateUserParam,
  UserProfilParam,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
  ) {}
  async findUsers() {
    return await this.userRepo.find({
      relations: {
        profile: true,
        posts: true,
      },
    });
  }

  createUsers(params: CreateUserParam) {
    const password = encodePassword(params.password);
    console.log(password);
    const newUser = this.userRepo.create({
      ...params,
      createdAt: new Date(),
      password,
    });
    return this.userRepo.save(newUser);
  }

  updateUser(id: number, params: UpdateUserParam) {
    return this.userRepo.update({ id }, { ...params });
  }

  deleteUser(id: number) {
    return this.userRepo.delete(id);
  }

  async createUserProfile(id: number, param: UserProfilParam) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newProfile = this.profileRepo.create(param);
    const saveProfile = await this.profileRepo.save(newProfile);
    user.profile = saveProfile;
    return this.userRepo.save(user);
  }

  async createPost(id: number, param: CreatePostParam) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newPost = this.postRepo.create({ ...param, user });
    return await this.postRepo.save(newPost);
  }

  findUser(username: string) {
    return this.userRepo.findOneBy({ username: username });
  }

  findUserById(id: number) {
    return this.userRepo.findOneBy({ id });
  }
}
