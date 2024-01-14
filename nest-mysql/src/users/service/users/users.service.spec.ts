import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/User';
import { Profile } from '../../../typeorm/entities/Profile';
import { Post } from '../../../typeorm/entities/Posts';
import { Repository } from 'typeorm';
import * as bcrypt from '../../../utils/bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: Repository<User>;
  let profileRepo: Repository<Profile>;
  let postRepo: Repository<Post>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const PROFILE_REPOSITORY_TOKEN = getRepositoryToken(Profile);
  const POST_REPOSITORY_TOKEN = getRepositoryToken(Post);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: PROFILE_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: POST_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    profileRepo = module.get<Repository<Profile>>(PROFILE_REPOSITORY_TOKEN);
    postRepo = module.get<Repository<Post>>(POST_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user repo should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  it('profile repo should be defined', () => {
    expect(profileRepo).toBeDefined();
  });

  it('post repo should be defined', () => {
    expect(postRepo).toBeDefined();
  });

  describe('createUser', () => {
    it('should create user', async () => {
      const mockUser = {
        username: 'test',
        password: '123',
      };
      jest.spyOn(bcrypt, 'encodePassword').mockReturnValueOnce('testHash');
      jest.spyOn(userRepo, 'create').mockReturnValueOnce({
        ...mockUser,
        id: 1,
        createdAt: new Date(),
        authStrategy: '',
        profile: new Profile(),
        user: undefined,
        posts: [],
      });
      await service.createUsers(mockUser);
      expect(bcrypt.encodePassword).toHaveBeenCalledWith('123');
      expect(userRepo.create).toHaveBeenCalledWith({
        ...mockUser,
        createdAt: expect.any(Date),
        password: 'testHash',
      });
    });
  });
});
