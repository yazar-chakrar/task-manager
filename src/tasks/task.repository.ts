import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Task } from "./task.entity";

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
}
