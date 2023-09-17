import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.types";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class TaskRepository extends Repository<Task> {
	constructor(private dataSource: DataSource) {
		super(Task, dataSource.createEntityManager());
	}

	async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		const { status, search } = filterDto;
		console.log(filterDto);
		const query = this.createQueryBuilder("task");

		if (status) {
			query.andWhere("task.status = :status", { status });
		}
		if (search) {
			query.andWhere(
				"((task.title LIKE :search) OR (task.description LIKE :search))",
				{
					search: `%${search}%`,
				},
			);
		}
		const tasks = await query.getMany();
		return tasks;
	}

	async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		const { title, description } = createTaskDto;
		const task: Task = Task.create({
			title,
			description,
			status: TaskStatus.DONE,
			user: user,
		});

		await task.save();
		return task;
	}
}
