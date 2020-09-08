import { ConnectionOptions } from 'typeorm';
import path from 'path';
import {
	DATABASE_NAME,
	DATABASE_TYPE,
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_USER,
	DATABASE_PASSWORD,
} from '@core';

export const ormconfig: ConnectionOptions = {
	type: DATABASE_TYPE as 'mysql',
	host: DATABASE_HOST,
	port: DATABASE_PORT,
	username: DATABASE_USER,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
	entities: [path.join(__dirname, '../../app/entity/*.entity{.ts,.js}')],
	synchronize: true,
	logging: true,
};
