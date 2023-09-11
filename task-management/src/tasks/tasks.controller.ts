import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  // whatever input will be parsed as body

  // @Post()
  // createTask(@Body('title') title, @Body('description') description): Task {
  //   return this.taskService.createTask(title, description);
  // }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/haha')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Task {
    return this.taskService.patchTaskStatus(id, updateTaskDTO);
  }
}
