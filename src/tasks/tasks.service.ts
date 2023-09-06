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
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}

	async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		return await this.taskRepository.getTasks(filterDto);
	}

	async getTaskById(id: number): Promise<Task> {
		const task = await this.taskRepository.findOneBy({ id });
		if (!task) {
			throw new NotFoundException();
		}
		return task;
	}

	async deleteTaskById(id: number): Promise<void> {
		const result = await this.taskRepository.delete(id);
		if (!result.affected) {
			throw new NotFoundException();
		}
	}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto);
	}

	async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
		const task = await this.getTaskById(id);
		task.status = status;
		await task.save();
		return task;
	}
}
