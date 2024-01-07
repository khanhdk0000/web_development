import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource, getConnection, getRepository } from 'typeorm';
import { Post, Session } from '@nestjs/common';
import { SessionEntity } from './typeorm/Session';
import { User } from './typeorm/entities/User';
import { Profile } from './typeorm/entities/Profile';
import { pgOptions } from './config/postgres';

const datasource = new DataSource({
  type: 'mysql',
  synchronize: true,
  entities: [User, Profile, Post, SessionEntity],
  ...pgOptions,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
      // store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(8000);
}
bootstrap();
