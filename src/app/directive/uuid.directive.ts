import { SchemaDirectiveVisitor, UserInputError } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { isUUID } from 'class-validator';
import { Logger } from '@core';

export class UUIDDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field: GraphQLField<any, any>) {
		const { resolve = defaultFieldResolver } = field;
		field.resolve = async function(...args) {
			const result = await resolve.apply(this, args);
			if (typeof result === 'string' && isUUID(result)) {
				Logger.debug('value of uuid: ' + result);
				return result;
			}

			throw new UserInputError('Form Argument is invalid, please try again.');
		};
	}
}
