/// <reference types="mongoose/types/document" />
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
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "../user/dtos/register-user.dto";
import { UpdateUserDto } from "../user/dtos/update-user.dto";
import { UserService } from "../user/user.service";
import { JwtPayload } from "./interface/jwtPayload.interface";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UserService, jwtService: JwtService, configService: ConfigService);
    credentialByPassword(username: string, password: string): Promise<{
        access_token: string;
    }>;
    genTokenFromUsername(username: string): Promise<{
        access_token: string;
    }>;
    genTokenFromSign(address: string, sign: string): Promise<{
        access_token: string;
    }>;
    register(registerUser: RegisterUserDto): Promise<import("../user/schemas/user.schema").User>;
    getUserFromJwtPayload({ id }: JwtPayload): Promise<import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").User> & Omit<import("../user/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateProfile(id: string, payload: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").User> & Omit<import("../user/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    isJwtTokenValid(token: string): Promise<JwtPayload | undefined>;
}
