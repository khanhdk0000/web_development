import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.3',
      port: 5432,
      username: 'postgres',
      password: 'a',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
  ],
})
export class AppModule {}
