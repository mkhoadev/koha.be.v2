/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { LoginDto } from "../user/dtos/login-user.dto";
import { LoginWalletDto } from "../user/dtos/login-wallet.dto";
import { UpdateUserDto } from "../user/dtos/update-user.dto";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interface/jwtPayload.interface";
import { RegisterUserDto } from "../user/dtos/register-user.dto";
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(registerUser: RegisterUserDto): Promise<import("../user/schemas/user.schema").User>;
    loginByWallet(loginDto: LoginWalletDto): Promise<{
        access_token: string;
    }>;
    me(auth: JwtPayload): Promise<import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").User> & import("../user/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateProfile(auth: JwtPayload, profile: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").User> & import("../user/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
