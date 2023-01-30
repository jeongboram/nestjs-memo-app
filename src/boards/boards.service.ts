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

	async getAllBoards(): Promise<Board[]> {
		return await this.boardRepository.find();
	}

	async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return await this.boardRepository.createBoard(createBoardDto);
	}

	async getBoardById(id: number): Promise<Board> {
		return await this.boardRepository.getBoardById(id);
	}

	async deleteBoard(id: number): Promise<void> {
		const result = await this.boardRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(`Can't find the ${id}`);
		}
	}

	async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		const board = await this.getBoardById(id);
		board.status = status;
		await this.boardRepository.save(board);
		return board;
	}

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
