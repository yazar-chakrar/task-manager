import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.types";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TaskRepository extends Repository<Task> {
	constructor(private dataSource: DataSource) {
		super(Task, dataSource.createEntityManager());
	}

	async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		const { status, search } = filterDto;
		const query = this.createQueryBuilder("task");

		const tasks = await query.getMany();

		return tasks;
	}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		const { title, description } = createTaskDto;
		const task: Task = Task.create({
			title,
			description,
			status: TaskStatus.DONE,
		});

		await task.save();
		return task;
	}
}
