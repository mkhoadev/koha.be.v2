import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "../../../global/base.model";
import { Optional } from "@nestjs/common";
import { IsString } from "class-validator";

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsString()
  metadata: string;

  @IsString()
  mintFee: number;

  @IsString()
  limit: string;

  @IsString()
  userLimit: string;

  @Optional()
  @IsString()
  contractAddress: string;

  @Optional()
  @IsString()
  image: string;

  @Optional()
  @IsString()
  cover: string;

  @Optional()
  @IsString()
  description: string;
}
