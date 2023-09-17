import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	Query,
	UsePipes,
	UseGuards,
	ValidationPipe,
	ParseIntPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status.validation.pipe";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.types";
import { GetUser } from "./../auth/decorators/get-user.decorator";
import { User } from "src/auth/user.entity";

@Controller("tasks")
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	@UseGuards(AuthGuard())
	getTasksFilter(
		@GetUser() user: User,
		@Query(ValidationPipe) filterDto: GetTasksFilterDto,
	): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto, user);
	}

	@Get("/:id")
	@UseGuards(AuthGuard())
	getTaskById(
		@GetUser() user: User,
		@Param("id", ParseIntPipe) id: number,
	): Promise<Task> {
		return this.tasksService.getTaskById(id, user);
	}

	@Delete("/:id")
	@UseGuards(AuthGuard())
	deleteTaskById(
		@GetUser() user: User,
		@Param("id") id: number,
	): Promise<void> {
		return this.tasksService.deleteTaskById(id, user);
	}

	@Post()
	@UseGuards(AuthGuard())
	@UsePipes(ValidationPipe)
	createTask(
		@GetUser() user: User,
		@Body() createTaskDto: CreateTaskDto,
	): Promise<Task> {
		return this.tasksService.createTask(createTaskDto, user);
	}

	@Patch("/:id/status")
	@UseGuards(AuthGuard())
	updateTaskStatus(
		@GetUser() user: User,
		@Param("id") id: number,
		@Body("status", TaskStatusValidationPipe) status: TaskStatus,
	): Promise<Task> {
		return this.tasksService.updateTaskStatus(id, status, user);
	}
}
