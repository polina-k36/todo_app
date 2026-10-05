/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  HttpCode,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { GetTaskParamsDto } from "./dto/get-task-params.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

//обработка ошибок

@ApiTags("Tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить список задач" })
  @ApiResponse({
    status: 200,
    description: "Задачи найдены",
  })
  @ApiResponse({
    status: 404,
    description: "Задачи не найдены",
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getTasks(@Query() params: GetTaskParamsDto, @Request() req) {
    const userId: number = req.user.id as number;
    return this.tasksService.getTasks(userId, params);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить количество задач" })
  @ApiResponse({
    status: 200,
    description: "Количество задач получено",
  })
  @Get("stats")
  @UseGuards(JwtAuthGuard)
  getCountTasks(@Request() req) {
    const userId: number = req.user.id as number;
    return this.tasksService.getStatsTasks(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить конкретную задачу по ID" })
  @ApiResponse({
    status: 200,
    description: "Задача найдена",
  })
  @ApiResponse({
    status: 404,
    description: "Задача не найдена",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @ApiParam({
    name: "id",
    example: 10,
  })
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getTaskById(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.id as number;
    return this.tasksService.getTaskById(id, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Создать задачу" })
  @ApiResponse({
    status: 201,
    description: "Задача создана",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() task: CreateTaskDto, @Request() req) {
    const userId: number = req.user.id as number;
    return this.tasksService.createTask(task, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Выполнить задачу в системе" })
  @ApiResponse({
    status: 201,
    description: "Задача изменена",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос",
  })
  @ApiParam({
    name: "id",
    example: 10,
  })
  @Post(":id/complete")
  @UseGuards(JwtAuthGuard)
  completeTask(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const userId: number = req.user.id as number;
    return this.tasksService.completeTask(id, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Убрать метку выполнения у задачи в системе" })
  @ApiResponse({
    status: 201,
    description: "Задача изменена",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос",
  })
  @ApiParam({
    name: "id",
    example: 10,
  })
  @Post(":id/incomplete")
  @UseGuards(JwtAuthGuard)
  incompleteTask(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const userId: number = req.user.id as number;
    return this.tasksService.incompleteTask(id, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Изменить задачу" })
  @ApiResponse({
    status: 201,
    description: "Задача изменена",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @ApiParam({
    name: "id",
    example: 10,
  })
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatedTask: UpdateTaskDto,
    @Request() req,
  ) {
    const userId: number = req.user.id as number;
    return this.tasksService.updateTask(id, updatedTask, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить задачу" })
  @ApiResponse({
    status: 204,
    description: "Задача удалена",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @ApiResponse({
    status: 404,
    description: "Задача для удаления не найдена",
  })
  @ApiParam({
    name: "id",
    example: 10,
  })
  @Delete(":id")
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const userId: number = req.user.id as number;
    await this.tasksService.deleteTask(id, userId);
  }
}
