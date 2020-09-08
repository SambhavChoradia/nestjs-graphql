import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Generated,
	ManyToOne,
} from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('employee')
export class EmployeeEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Generated('uuid')
	euid: string;

	@Column({
		type: 'varchar',
	})
	firstName: string;

	@Column({
		type: 'varchar',
	})
	lastName: string;

	@ManyToOne(
		() => CompanyEntity,
		company => company.employee,
	)
	company: CompanyEntity;

	@CreateDateColumn({
		name: 'createdAt',
		nullable: false,
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: 'updatedAt',
		nullable: true,
	})
	updatedAt: Date;
}
