import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { LoginDto } from "../user/dtos/login-user.dto";
import { LoginWalletDto } from "../user/dtos/login-wallet.dto";
import { UpdateUserDto } from "../user/dtos/update-user.dto";
import { AuthService } from "./auth.service";
import { Auth } from "./decorator/auth.decorator";
import { JwtAuthGuard } from "./guard/jwt.guard";
import { JwtPayload } from "./interface/jwtPayload.interface";

@ApiBearerAuth()
@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.service.credentialByPassword(loginDto?.username, loginDto?.password);
  }

  @Post("wallet_login")
  async loginByWallet(@Body() loginDto: LoginWalletDto) {
    return await this.service.genTokenFromSign(loginDto.address, loginDto.sign);
  }

  @UseGuards(JwtAuthGuard)
  @Post("me")
  async me(@Auth() auth: JwtPayload) {
    return await this.service.getUserFromJwtPayload(auth);
  }

  @UseGuards(JwtAuthGuard)
  @Post("profile")
  async updateProfile(@Auth() auth: JwtPayload, @Body() profile: UpdateUserDto) {
    return await this.service.updateProfile(auth.id, profile);
  }
}
