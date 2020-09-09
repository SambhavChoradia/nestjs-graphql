import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, PORT, HttpExceptionFilter } from '@core';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new HttpExceptionFilter());
	await app.listen(PORT);
	Logger.debug(`🚀  Server is listening on port ${PORT}`);
}

// Start Application
bootstrap().catch(e => {
	Logger.error(`❌  Error starting server, ${e}`);
	throw e;
});
