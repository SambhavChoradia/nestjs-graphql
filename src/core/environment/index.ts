import 'dotenv/config';

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application
const DOMAIN: string = process.env.DOMAIN || 'localhost';
const PORT: number = +process.env.PORT || 4200;

// mysql
const DATABASE_TYPE: string = process.env.DATABASE_TYPE || 'mysql';
const DATABASE_HOST: string = process.env.DATABASE_HOST || '127.0.0.1';
const DATABASE_PORT: number = +process.env.DATABASE_PORT || 3306;
const DATABASE_USER: string = process.env.DATABASE_USER;
const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD;
const DATABASE_NAME: string = process.env.DATABASE_NAME;

export {
	NODE_ENV,
	DOMAIN,
	PORT,
	DATABASE_TYPE,
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_USER,
	DATABASE_PASSWORD,
	DATABASE_NAME,
};
