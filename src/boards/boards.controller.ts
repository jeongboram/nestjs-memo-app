import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
	constructor(private boardsService: BoardsService) {}

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	@Post()
	@UsePipes(ValidationPipe) //파이프 - 유효성 체크를 통과하면 아래 메소드 실행.
	createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardsService.createBoard(CreateBoardDto);
	}

	// @Get('/')
	// getAllBoards(): Board[] {
	// 	return this.boardsService.getAllBoards();
	// }

	// @Post()
	// @UsePipes(ValidationPipe)
	// createBoard(@Body() createBoardDto: CreateBoardDto): Board {
	// 	return this.boardsService.createBoard(createBoardDto);
	// }

	// @Get('/:id')
	// getBoardById(@Param('id') id: string): Board {
	// 	return this.boardsService.getBoardById(id);
	// }

	// @Delete('/:id')
	// deleteBoard(@Param('id') id: string): void {
	// 	this.boardsService.deleteBoard(id);
	// }

	// @Patch('/:id/status')
	// updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
	// 	return this.boardsService.updateBoardStatus(id, status);
	// }
}
