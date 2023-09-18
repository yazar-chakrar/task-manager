import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WinstonModule } from "nest-winston";
import { winstonModuleConfig } from "./config/logs/winstonModule.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger(winstonModuleConfig),
	});
	await app.listen(3000);
}
bootstrap();
