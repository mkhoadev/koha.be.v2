import { Request as HttpRequest } from 'express';
import { JwtPayload } from './jwtPayload.interface';
export declare type AuthRequest = HttpRequest & {
    user: JwtPayload;
};
