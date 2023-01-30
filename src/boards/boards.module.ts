import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardRepository } from './boards.repository';
import { BoardsService } from './boards.service';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
	imports: [TypeOrmExModule.forCustomRepository([BoardRepository])],
	controllers: [BoardsController],
	providers: [BoardsService],
})
export class BoardsModule {}
