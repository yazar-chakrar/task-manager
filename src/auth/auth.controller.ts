import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Throttle({ default: { limit: 1, ttl: 10000 } })
	@Post("/signup")
	signUp(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
	): Promise<void> {
		return this.authService.signUp(authCredentialsDto);
	}

	@Throttle({ default: { limit: 3, ttl: 30000 } })
	@Post("/signin")
	signIn(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
	): Promise<{ accesToken: string }> {
		return this.authService.signIn(authCredentialsDto);
	}
}
