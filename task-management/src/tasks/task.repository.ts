import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';

@EntityRepository()
export class TasksRepository extends Repository<Task> {}
