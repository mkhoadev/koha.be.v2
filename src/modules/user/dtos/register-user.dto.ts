import { IsEnum, IsOptional, Length } from "class-validator";
import { BaseModel } from "src/global/base.model";
import { UserRoleEnum } from "../interfaces/userRole.enum";

export class RegisterUserDto extends BaseModel {
  @Length(4, 50)
  username: string;

  @Length(4, 30)
  password: string;

  @IsOptional()
  @Length(4, 30)
  displayName: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  cover: string;

  @IsOptional()
  address: string;

  @IsOptional()
  description: string;

  @IsEnum(UserRoleEnum)
  role = UserRoleEnum.USER;
}
