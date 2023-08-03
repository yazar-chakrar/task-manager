import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../task.types";

export class GetTasksFilterDto {
	@IsOptional()
	@IsIn(Object.keys(TaskStatus).map(key => TaskStatus[key]))
	status: TaskStatus;

	@IsOptional()
	search: string;
}
