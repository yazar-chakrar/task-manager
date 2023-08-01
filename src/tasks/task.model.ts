export interface Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatuts;
}

export enum TaskStatuts {
	OPEN = "OPEN",
	IN_PROGRESS = "IN_PROGRESS",
	DONE = "DONE",
}
