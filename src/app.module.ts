import { Module, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { RequestLoggerMiddleware } from "./middlewares/request-logger.middleware";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule],
	controllers: [],
	providers: [],
})
export class AppModule {
	// add a middleware on all routes
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLoggerMiddleware).forRoutes("*");
	}
}
