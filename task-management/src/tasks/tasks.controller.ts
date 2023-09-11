import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilter(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
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
