import { Injectable } from "@nestjs/common";
import { Task, TaskStatuts } from "./task.model";
import { randomUUID } from "crypto";

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	getAllTasks(): Task[] {
		return this.tasks;
	}

	createTask(title: string, description: string): Task {
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
