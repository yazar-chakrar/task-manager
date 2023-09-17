import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "topSecretYazar",
			signOptions: {
				expiresIn: 3600,
			},
		}),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [AuthController],
	providers: [JwtStrategy, AuthService, UserRepository],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
