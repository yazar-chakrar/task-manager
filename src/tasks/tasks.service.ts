import { Injectable } from "@nestjs/common";
import { Task, TaskStatuts } from "./task.model";
import { randomUUID } from "crypto";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	getAllTasks(): Task[] {
		return this.tasks;
	}

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;
		const task: Task = {
			id: randomUUID(),
			title,
			description,
			status: TaskStatuts.DONE,
		};

		this.tasks.push(task);

		return task;
	}
}
