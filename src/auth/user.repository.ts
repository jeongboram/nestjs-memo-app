import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CustomRepository } from 'src/boards/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
		const { username, password } = authCredentialDto;
		const user = this.create({
			username,
			password,
		});

		try {
			await this.save(user);
		} catch (error) {
			if (error.errno === 1062) {
				//TODO : Error code 추후 확인
				throw new ConflictException('exists username');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}
}
