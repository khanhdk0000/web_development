import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    // const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title: createTaskDTO.title,
      description: createTaskDTO.description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): void {
    const idx = this.tasks.findIndex((task) => task.id === id);
    if (idx > -1) {
      this.tasks.splice(idx, 1);
    }
  }

  patchTaskStatus(id: string, updateTaskDTO: UpdateTaskDTO): Task {
    // const status: keyof typeof TaskStatus = updateTaskDTO.status;
    const idx = this.tasks.findIndex((task) => task.id === id);
    this.tasks[idx].status = TaskStatus[updateTaskDTO.status];
    return this.tasks[idx];
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
}
