import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Logger } from 'core/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
	catch(exception: HttpException) {
		Logger.error(JSON.stringify(exception));
		return exception;
	}
}
