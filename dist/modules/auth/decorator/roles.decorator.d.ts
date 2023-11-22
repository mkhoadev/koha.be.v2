import { UserRoleEnum } from '../../user/interfaces/userRole.enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserRoleEnum[]) => import("@nestjs/common").CustomDecorator<string>;
