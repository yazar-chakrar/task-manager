import { Controller, Get, Post, Body } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TasksController {
	constructor(private TasksService: TasksService) {}

	@Get()
	getAllTasks(): Task[] {
		return this.TasksService.getAllTasks();
	}

	@Post()
	createTask(@Body("title") title, @Body("description") description): Task {
		return this.TasksService.createTask(title, description);
	}
}
