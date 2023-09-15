import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

const getEnvValue = (key: string, throwOnMissing = true): string => {
	const value = process.env[key];
	if (!value && throwOnMissing) {
		throw new Error(`config error - missing env.${key}`);
	}

	return value;
};

const isProduction = (): boolean => {
	const mode = getEnvValue("NODE_ENV", false);
	return mode == "production";
};

dotenv.config({
	path: `env/${isProduction() ? "prod.env" : "dev.env"}`,
});

export const typeOrmConfig: TypeOrmModuleOptions = {
	/* type: "mysql",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME, */
	//entities: [__dirname + "/../**/*.entity{.ts,.js}"],

	//synchronize: true,
	//logging: true,
	//dropSchema: true,

	type: "postgres",

	host: getEnvValue("DB_HOST"),
	port: parseInt(getEnvValue("DB_PORT"), 10),
	username: getEnvValue("DB_USER"),
	password: getEnvValue("DB_PWD", false),
	database: getEnvValue("DB_NAME"),

	entities: [__dirname + "/../**/*.entity{.ts,.js}"],

	migrationsTableName: "migration",

	migrations: ["src/migration/*.ts"],

	/* cli: {
		migrationsDir: "src/migration",
	}, */
	synchronize: true,
	//logging: true,
	dropSchema: true,

	ssl: isProduction(),
};
