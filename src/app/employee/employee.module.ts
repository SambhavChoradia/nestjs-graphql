import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeEntity, CompanyEntity } from '@app/entity';
import { CompanyService } from '@app/company/company.service';

@Module({
	imports: [TypeOrmModule.forFeature([EmployeeEntity, CompanyEntity])],
	providers: [EmployeeService, EmployeeResolver, CompanyService],
})
export class EmployeeModule {}
