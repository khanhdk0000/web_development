import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   // const { title, description } = createTaskDTO;

  //   const task: Task = {
  //     id: uuid(),
  //     title: createTaskDTO.title,
  //     description: createTaskDTO.description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
    return found;
  }

  // getTaskById(id: string) {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException('Something bad happened', {
  //       cause: new Error(),
  //       description: 'Some error description',
  //     });
  //   }
  //   return found;
  // }

  // deleteTaskById(id: string): void {
  //   this.getTaskById(id);
  //   const idx = this.tasks.findIndex((task) => task.id === id);
  //   if (idx > -1) {
  //     this.tasks.splice(idx, 1);
  //   }
  // }

  // patchTaskStatus(id: string, updateTaskDTO: UpdateTaskDTO): Task {
  //   // const status: keyof typeof TaskStatus = updateTaskDTO.status;
  //   const task = this.getTaskById(id);
  //   // const idx = this.tasks.findIndex((task) => task.id === id);
  //   task.status = updateTaskDTO.status;
  //   return task;
  // }

  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
}
