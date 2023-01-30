import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { CustomRepository } from './typeorm-ex.decorator';
import { BoardStatus } from './boards-status.enum';

//Board에 관란 데이터베이스 처리는 여기에서.
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
	async getBoardById(id: number): Promise<Board> {
		const found = await this.findOneBy({ id });
		if (!found) {
			throw new NotFoundException(`Can't find the ${id}`);
		}
		return found;
	}

	async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		const { title, description } = createBoardDto;
		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
		});
		await this.save(board);
		return board;
	}

	// async deleteBoard(id): Promise<void> {
	// 	const found = await this.findOneBy({ id });
	// 	if (!found) {
	// 		throw new NotFoundException(`Can't find the ${id}`);
	// 	}

	// }
}
