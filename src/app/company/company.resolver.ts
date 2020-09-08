import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';

@Resolver('Company')
export class CompanyResolver {
	constructor(private readonly companyService: CompanyService) {}

	@Query()
	async showCompany() {
		return await this.companyService.show();
	}

	@Mutation()
	async createCompany(@Args('name') name: string) {
		const data = { name };
		return await this.companyService.create(data);
	}

	@Mutation()
	async deleteCompany(@Args('cuid') cuid: string) {
		return await this.companyService.delete(cuid);
	}

	@Mutation()
	async updateCompany(@Args('cuid') cuid: string, @Args('name') name: string) {
		const data = { cuid, name };
		return await this.companyService.update(data);
	}
}
