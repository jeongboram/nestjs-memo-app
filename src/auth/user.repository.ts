import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CustomRepository } from 'src/boards/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
		const { username, password } = authCredentialDto;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = this.create({
			username,
			password: hashedPassword,
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
