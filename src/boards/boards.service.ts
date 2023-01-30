import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
	constructor(private boardRepository: BoardRepository) {}

	async getBoardById(id: number): Promise<Board> {
		const found = await this.boardRepository.findOneBy({ id });
		if (!found) {
			throw new NotFoundException(`Can't find the ${id}`);
		}
		return found;
	}

	async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		const { title, description } = createBoardDto;
		const board = this.boardRepository.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
		});
		await this.boardRepository.save(board);
		return board;
	}

	// getAllBoards(): Board[] {
	// 	return this.boards;
	// }
	// // createBoard(title: string, description: string) {
	// // 	const board: Board = {
	// // 		id: uuid(),
	// // 		title,
	// // 		description,
	// // 		status: BoardStatus.PUBLIC,
	// // 	};
	// // 	this.boards.push(board);
	// // 	return board;
	// // }
	// deleteBoard(id: string): void {
	// 	const found = this.getBoardById(id);
	// 	if (!found) {
	// 		throw new NotFoundException(`Can't find the ${id}`);
	// 	}
	// 	this.boards = this.boards.filter((board) => board.id !== found.id);
	// }
	// updateBoardStatus(id: string, status: BoardStatus): Board {
	// 	const board = this.getBoardById(id);
	// 	board.status = status;
	// 	return board;
	// }
}
