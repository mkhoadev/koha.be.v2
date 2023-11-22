"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const ethers_1 = require("ethers");
const user_service_1 = require("../user/user.service");
const utils_1 = require("../user/utils");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async credentialByPassword(username, password) {
        const user = await this.usersService.findOneUser(username);
        if ((user === null || user === void 0 ? void 0 : user.role) !== "admin" && (user === null || user === void 0 ? void 0 : user.password)) {
            throw new common_1.HttpException("User does not have access rights", common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!user)
            throw new common_1.HttpException("Username or Password is not correct", common_1.HttpStatus.NOT_FOUND);
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new common_1.HttpException("Username or Password is not correct", common_1.HttpStatus.UNAUTHORIZED);
        const payload = {
            username: user.username,
            id: user._id.toString(),
            address: user.address,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async genTokenFromUsername(username) {
        const user = await this.usersService.findOneByUsername(username);
        const payload = {
            username: user.username,
            id: user._id.toString(),
            address: user.address,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async genTokenFromSign(address, sign) {
        const user = await this.usersService.findByAddressIncludeNonce(address);
        if (Object.keys(user).length === 0) {
            throw new common_1.HttpException("User not found or blocked", common_1.HttpStatus.BAD_REQUEST);
        }
        if (sign.indexOf("0x") !== 0) {
            sign = "0x" + sign;
        }
        const msg = (0, utils_1.createSignMessage)((0, ethers_1.getAddress)(address), user.nonce);
        const addressFromSign = (0, ethers_1.verifyMessage)((0, ethers_1.toUtf8Bytes)(msg), sign);
        if ((0, ethers_1.getAddress)(addressFromSign) !== (0, ethers_1.getAddress)(address))
            throw new common_1.HttpException("Invalid sign", common_1.HttpStatus.BAD_REQUEST);
        const payload = {
            username: user.username,
            id: user.id,
            address,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(registerUser) {
        return this.usersService.create(registerUser);
    }
    async getUserFromJwtPayload({ id }) {
        const user = await this.usersService.findOne(id);
        if (!user)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async updateProfile(id, payload) {
        return this.usersService.update(id, payload);
    }
    async isJwtTokenValid(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (e) {
            return;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map