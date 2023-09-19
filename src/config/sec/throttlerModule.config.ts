import { ThrottlerModuleOptions } from "@nestjs/throttler";

export const throttlerModuleConfig: ThrottlerModuleOptions = [
	{
		ttl: 10000,
		limit: 10,
	},
];
