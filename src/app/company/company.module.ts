import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '@app/entity';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([CompanyEntity])],
	providers: [CompanyService, CompanyResolver],
})
export class CompanyModule {}
