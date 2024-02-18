import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { SessionEntity } from '../src/typeorm/Session';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
    app.use(
      session({
        name: 'nest_session',
        secret: 'qwerty',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000,
        },
        store: new TypeormStore().connect(sessionRepository),
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  describe('Authentication', () => {
    const URL = '/auth/login';
    it('should login', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({ username: 'khue', password: 'a' })
        .expect(201);
    });
  });
});
