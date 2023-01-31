import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/signup')
	signUp(@Body(ValidationPipe) authcrenditionDto: AuthCredentialDto): Promise<void> {
		return this.authService.signUp(authcrenditionDto);
	}

	@Post('/signin')
	signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
		return this.authService.signIn(authCredentialDto);
	}
}
