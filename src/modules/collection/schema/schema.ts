import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "../../../global/base.model";

export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection extends BaseModel {
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  metadata: string;

  @Prop()
  contractAddress: string;

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  mintFee: number;

  @Prop()
  limit: string;

  @Prop()
  userLimit: string;

  @Prop()
  description: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
