import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "../../../global/base.model";
import { UserRoleEnum } from "../interfaces/userRole.enum";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends BaseModel {
  @Prop()
  username: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  email: string;

  @Prop()
  displayName: string;

  @Prop()
  address: string;

  @Prop()
  avatar: string;

  @Prop()
  cover: string;

  @Prop()
  description: string;

  @Prop({ default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Prop({ type: String, select: false })
  nonce: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
