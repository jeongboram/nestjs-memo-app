import { EntityRepository, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { CustomRepository } from './typeorm-ex.decorator';

//Board에 관란 데이터베이스 처리는 여기에서.
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
