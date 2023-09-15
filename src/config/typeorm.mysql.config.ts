import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config({
	path: `env/${process.env.NODE_ENV === "production" ? "prod.env" : "dev.env"}`,
});

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: "mysql",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME,
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],

	synchronize: true,
	//logging: true,
	//dropSchema: true,
};
