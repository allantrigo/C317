import "reflect-metadata";
import { createConnection, createConnections } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes, UnprotectedRoutes } from "./routes";
import { auth } from "./middleware/auth";

require("dotenv").config();

const config: any = {
	name: "default",
	type: "postgres",
	host: `${process.env.POSTGRES_HOST}`,
	port: process.env.POSTGRES_PORT,
	username: `${process.env.POSTGRES_USER}`,
	password: `${process.env.POSTGRES_PASSWORD}`,
	database: `${process.env.POSTGRES_DB}`,
	synchronize: true,
	entities: ["src/entities/*.ts"],
	subscribers: ["src/subscriber/*.ts"],
	migrations: ["src/migration/*.ts"],
	cli: {
		entitiesDir: "src/entities",
		migrationsDir: "src/migration",
		subscribersDir: "src/subscriber",
	},
};

createConnection(config)
	.then(async (connection) => {
		const app = express();
		app.use(bodyParser.json());

		UnprotectedRoutes.forEach((route) => {
			app[route.method](
				route.path,
				(request: Request, response: Response, next: Function) => {
					route
						.action(request, response)
						.then(() => next)
						.catch((err) => next(err));
				}
			);
		});
		app.use(auth);

		AppRoutes.forEach((route) => {
			app[route.method](
				route.path,
				(request: Request, response: Response, next: Function) => {
					route
						.action(request, response)
						.then(() => next)
						.catch((err) => next(err));
				}
			);
		});

		app.listen(3000);

		console.log("Express application is up and running on port 3000");
	})
	.catch((error) => console.log("TypeORM connection error: ", error));
