import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task.types";
import { randomUUID } from "crypto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { User } from "src/auth/user.entity";

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}

	async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
		return await this.taskRepository.getTasks(filterDto, user);
	}

	async getTaskById(id: number, user: User): Promise<Task> {
		const task = await this.taskRepository.findOne({
			where: { id, userId: user.id },
		});
		if (!task) {
			throw new NotFoundException();
		}
		return task;
	}

	async deleteTaskById(id: number, user: User): Promise<void> {
		const result = await this.taskRepository.delete({ id, userId: user.id });
		if (!result.affected) {
			throw new NotFoundException(`Task with ID '${id}' not found`);
		}
	}

	async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto, user);
	}

	async updateTaskStatus(
		id: number,
		status: TaskStatus,
		user: User,
	): Promise<Task> {
		const task = await this.getTaskById(id, user);
		task.status = status;
		await task.save();
		return task;
	}
}
