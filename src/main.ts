import { NestFactory } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { winstonModuleConfig } from "./config/logging/winstonModule.config";
import helmet from "@fastify/helmet";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		{
			logger: WinstonModule.createLogger(winstonModuleConfig),
		},
	);
	app.register(helmet);
	await app.listen(3000);
}
bootstrap();
