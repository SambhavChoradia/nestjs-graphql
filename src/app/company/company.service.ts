import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '@app/entity';
// import { ApolloError } from 'apollo-server';

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
	) {}

	async findOne(cuid: string): Promise<CompanyEntity> {
		const company = await this.companyRepository.findOne({
			where: { cuid: cuid },
		});

		if (!company) {
			// throw new ApolloError('Company not found', '400');
			throw new HttpException('Company not found', HttpStatus.BAD_REQUEST);
		}

		return company;
	}

	async show(): Promise<CompanyEntity[]> {
		const company = await this.companyRepository.find({
			relations: ['employee'],
		});
		if (company.length > 0) {
			return company;
		}
		throw new HttpException('No Content', HttpStatus.NO_CONTENT);
	}

	async create(data): Promise<CompanyEntity> {
		const { name } = data;

		const company = await this.companyRepository.findOne({
			where: { name },
		});

		if (company) {
			throw new HttpException('Company already exists', HttpStatus.CONFLICT);
		}

		const createCompany = await this.companyRepository.create({
			name: name,
		});

		const saveCompany = await this.companyRepository.save(createCompany);

		if (!saveCompany) {
			throw new HttpException(
				'Issue creating company',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}

		return saveCompany;
	}

	async delete(cuid: string): Promise<boolean> {
		const company = await this.findOne(cuid);

		const deleteCompany = await this.companyRepository.delete(company.id);

		if (!deleteCompany) {
			throw new HttpException(
				'Issue deleting company',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
		return true;
	}

	async update(data): Promise<CompanyEntity> {
		const { cuid, name } = data;

		const company = await this.findOne(cuid);

		const updateCompany = await this.companyRepository.update(company.id, {
			name: name,
		});

		if (!updateCompany) {
			throw new HttpException(
				'Issue updating Company',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
		return await this.findOne(cuid);
	}
}
