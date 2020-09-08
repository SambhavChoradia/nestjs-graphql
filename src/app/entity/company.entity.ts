import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Generated,
	OneToMany,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity('company')
export class CompanyEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Generated('uuid')
	cuid: string;

	@Column({
		type: 'varchar',
		unique: true,
	})
	name: string;

	@OneToMany(
		() => EmployeeEntity,
		employee => employee.company,
		{ cascade: true },
	)
	employee: EmployeeEntity[];

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
