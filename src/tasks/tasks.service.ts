import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task.types";
import { randomUUID } from "crypto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
	constructor(
		/* @InjectRepository(Task) */
		private taskRepository: TaskRepository,
	) {}

	/* getAllTasks(): Task[] {
		return this.tasks;
	} */

	/* getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
		const { status, search } = filterDto;
		let tasks = this.getAllTasks();
		if (status) {
			tasks = tasks.filter(task => task.status === status);
		}
		if (search) {
			tasks = tasks.filter(
				task =>
					task.title.includes(search) || task.description.includes(search),
			);
		}
		return tasks;
	} */

	async getTaskById(id: number): Promise<Task> {
		const task = await this.taskRepository.firstWhere(id);
		if (!task) {
			throw new NotFoundException();
		}
		return task;
	}

	/* deleteTaskById(id: string): Task {
		const found = this.getTaskById(id);
		this.tasks = this.tasks.filter(task => task.id !== found.id);
		return found;
	} */

	/* createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;
		const task: Task = {
			id: randomUUID(),
			title,
			description,
			status: TaskStatus.DONE,
		};
		this.tasks.push(task);
		return task;
	} */

	/* updateTaskStatus(id: string, status: TaskStatus): Task {
		const task = this.getTaskById(id);
		task.status = status;
		return task;
	} */
}
