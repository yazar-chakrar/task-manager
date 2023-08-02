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
	ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status.validation.pipe";

@Controller("tasks")
export class TasksController {
	constructor(private TasksService: TasksService) {}

	@Get()
	getTasksFilter(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
		if (Object.keys(filterDto).length) {
			return this.TasksService.getTasksWithFilters(filterDto);
		}
		return this.TasksService.getAllTasks();
	}

	@Get("/:id")
	getTaskById(@Param("id") id: string): Task {
		return this.TasksService.getTaskById(id);
	}

	@Delete("/:id")
	deleteTaskById(@Param("id") id: string): Task {
		return this.TasksService.deleteTaskById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.TasksService.createTask(createTaskDto);
	}

	@Patch("/:id/status")
	updateTaskStatus(
		@Param("id") id: string,
		@Body("status", TaskStatusValidationPipe) status: TaskStatus,
	): Task {
		return this.TasksService.updateTaskStatus(id, status);
	}
}
