import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.types";

export class TaskStatusValidationPipe implements PipeTransform {
	readonly allowedStatuses = Object.keys(TaskStatus).map(
		key => TaskStatus[key],
	);

	transform(value: any) {
		value = value.toUpperCase();
		if (!this.isStatusValid(value)) {
			throw new BadRequestException(`"${value}" is invalid status`);
		}
		return value;
	}

	private isStatusValid(status: any) {
		const idx = this.allowedStatuses.indexOf(status);
		return idx != -1;
	}
}
