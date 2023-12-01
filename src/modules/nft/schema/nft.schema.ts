import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "../../../global/base.model";

export type NftDocument = HydratedDocument<Nft>;

@Schema()
export class Nft extends BaseModel {
  @Prop()
  name: string;

  @Prop()
  tokenId: string;

  @Prop()
  contractAddress: string;

  @Prop()
  image: string;

  @Prop()
  metadata: string;

  @Prop()
  ownerAddress: string;
}

export const NftSchema = SchemaFactory.createForClass(Nft);
