import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.types";

@Injectable()
export class TaskRepository extends Repository<Task> {
	constructor(private dataSource: DataSource) {
		super(Task, dataSource.createEntityManager());
	}

	async firstWhere(id: number): Promise<Task | undefined> {
		return await this.createQueryBuilder()
			.where(`id = :value`, { value: id })
			.getOne();
	}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		const { title, description } = createTaskDto;

		const task: Task = new Task();
		task.title = title;
		task.description = description;
		task.status = TaskStatus.DONE;

		await task.save();
		return task;
	}
}
