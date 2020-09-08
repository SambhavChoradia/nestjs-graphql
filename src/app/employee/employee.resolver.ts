import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';

@Resolver('Employee')
export class EmployeeResolver {
	constructor(private readonly employeeService: EmployeeService) {}

	@Query()
	async showEmployee(@Args('cuid') cuid: string) {
		return await this.employeeService.show(cuid);
	}

	@Mutation()
	async createEmployee(@Args('input') input) {
		return await this.employeeService.create(input);
	}

	@Mutation()
	async deleteEmployee(@Args('euid') euid: string) {
		return await this.employeeService.delete(euid);
	}

	@Mutation()
	async updateEmployee(@Args('input') input) {
		return await this.employeeService.update(input);
	}
}
