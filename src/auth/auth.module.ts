import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/boards/typeorm-ex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'secretkey',
			signOptions: {
				expiresIn: 60 * 60,
			},
		}),
		TypeOrmExModule.forCustomRepository([UserRepository]),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
