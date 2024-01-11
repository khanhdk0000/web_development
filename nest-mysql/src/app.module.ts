import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/Profile';
import { Post } from './typeorm/entities/Posts';
import { AuthModule } from './auth/auth.module';
import { pgOptions } from './config/postgres';
import { SessionEntity } from './typeorm/Session';
import { PassportModule } from '@nestjs/passport';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      entities: [User, Profile, Post, SessionEntity],
      synchronize: true,
      ...pgOptions,
    }),
    UsersModule,
    AuthModule,
    PassportModule.register({ session: true }),
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
