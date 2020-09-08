import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ormconfig } from '@core';
import { CompanyModule } from '@app/company/company.module';
import { EmployeeModule } from './app/employee/employee.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(ormconfig),
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
		}),
		CompanyModule,
		EmployeeModule,
	],
})
export class AppModule {}
