import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
	type: 'mysql',
	host: 'maria.runesys.com',
	port: 13306,
	username: 'runigen-mng',
	password: '!runigen1222',
	database: 'runigen-homepage',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true,
};
