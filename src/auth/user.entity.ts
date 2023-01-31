import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username']) //중복 아이디값 체크. 정확한 가이드를 위해선 try catch 구문으로 작성.(레포지토리)
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;
}
