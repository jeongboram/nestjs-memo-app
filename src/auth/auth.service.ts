import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

	async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
		return this.userRepository.createUser(authCredentialDto);
	}

	async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
		const { username, password } = authCredentialDto;
		const user = await this.userRepository.findOneBy({ username });
		if (user && (await bcrypt.compare(password, user.password))) {
			//user 토큰 생성. (secret + payload)
			const payload = { username }; //페이로드에는 중요한 정보는 넣지 않은 것이 좋다.
			const accessToken = await this.jwtService.sign(payload);

			return { accessToken: accessToken };
		} else {
			throw new UnauthorizedException('login failed');
		}
	}
}
