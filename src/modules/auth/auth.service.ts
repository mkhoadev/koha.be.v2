import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { getAddress, toUtf8Bytes, verifyMessage } from "ethers";
import { RegisterUserDto } from "../user/dtos/register-user.dto";
import { UpdateUserDto } from "../user/dtos/update-user.dto";
import { UserService } from "../user/user.service";
import { createSignMessage } from "../user/utils";
import { JwtPayload } from "./interface/jwtPayload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async credentialByPassword(username: string, password: string) {
    const user = await this.usersService.findOneUser(username);

    if (user?.role !== "admin" && user?.password) {
      throw new HttpException("User does not have access rights", HttpStatus.UNAUTHORIZED);
    }
    if (!user) throw new HttpException("Username or Password is not correct", HttpStatus.NOT_FOUND);
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      throw new HttpException("Username or Password is not correct", HttpStatus.UNAUTHORIZED);
    const payload: JwtPayload = {
      username: user.username,
      id: user._id.toString(),
      address: user.address,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async genTokenFromUsername(username: string) {
    const user = await this.usersService.findOneByUsername(username);
    const payload: JwtPayload = {
      username: user.username,
      id: user._id.toString(),
      address: user.address,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async genTokenFromSign(address: string, sign: string) {
    const user = await this.usersService.findByAddressIncludeNonce(address);

    if (Object.keys(user).length === 0) {
      throw new HttpException("User not found or blocked", HttpStatus.BAD_REQUEST);
    }

    if (sign.indexOf("0x") !== 0) {
      sign = "0x" + sign;
    }
    const msg = createSignMessage(getAddress(address), user.nonce);
    const addressFromSign = verifyMessage(toUtf8Bytes(msg), sign);

    if (getAddress(addressFromSign) !== getAddress(address))
      throw new HttpException("Invalid sign", HttpStatus.BAD_REQUEST);

    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
      address,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUser: RegisterUserDto) {
    return this.usersService.create(registerUser);
  }

  async getUserFromJwtPayload({ id }: JwtPayload) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    return user;
  }

  async updateProfile(id: string, payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  async isJwtTokenValid(token: string): Promise<JwtPayload | undefined> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return;
    }
  }
}
