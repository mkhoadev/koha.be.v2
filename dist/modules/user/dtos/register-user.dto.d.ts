import { BaseModel } from "src/global/base.model";
import { UserRoleEnum } from "../interfaces/userRole.enum";
export declare class RegisterUserDto extends BaseModel {
    username: string;
    password: string;
    displayName: string;
    avatar: string;
    cover: string;
    address: string;
    description: string;
    role: UserRoleEnum;
}
