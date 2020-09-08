import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from '@app/entity';
import { CompanyService } from '@app/company/company.service';

@Injectable()
export class EmployeeService {
	constructor(
		@InjectRepository(EmployeeEntity)
		private readonly employeeRepository: Repository<EmployeeEntity>,
		private readonly companyService: CompanyService,
	) {}

	async findOne(euid: string): Promise<EmployeeEntity> {
		const employee = await this.employeeRepository.findOne({
			where: { euid: euid },
		});

		if (!employee) {
			throw new HttpException('Employee not found', HttpStatus.BAD_REQUEST);
		}

		return employee;
	}

	async show(cuid: string): Promise<EmployeeEntity[]> {
		const company = await this.companyService.findOne(cuid);

		const employee = await this.employeeRepository.find({
			where: { companyId: company },
			select: ['euid', 'firstName', 'lastName'],
		});

		if (employee.length > 0) {
			return employee;
		}
		throw new HttpException('No Content', HttpStatus.NO_CONTENT);
	}

	async create(data): Promise<EmployeeEntity> {
		const { cuid, firstName, lastName } = data;

		const company = await this.companyService.findOne(cuid);
		const createEmployee = await this.employeeRepository.create({
			firstName: firstName,
			lastName: lastName,
			company: company,
		});

		const saveEmployee = await this.employeeRepository.save(createEmployee);

		if (!saveEmployee) {
			throw new HttpException(
				'Issue creating employee',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}

		return saveEmployee;
	}

	async delete(euid: string): Promise<boolean> {
		const employee = await this.findOne(euid);

		const deleteEmployee = await this.employeeRepository.delete(employee.id);

		if (!deleteEmployee) {
			throw new HttpException(
				'Issue deleting employee',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
		return true;
	}

	async update(data): Promise<EmployeeEntity> {
		const { euid, firstName, lastName } = data;

		const employee = await this.findOne(euid);

		const updateEmployee = await this.employeeRepository.update(employee.id, {
			firstName: firstName,
			lastName: lastName,
		});

		if (!updateEmployee) {
			throw new HttpException(
				'Issue updating employee',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
		return await this.findOne(euid);
	}
}
