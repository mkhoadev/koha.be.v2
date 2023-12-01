import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NftController } from "./nft.controller";
import { NftService } from "./nft.service";
import { Nft, NftSchema } from "./schema/nft.schema";

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }])],
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService],
})
export class NftModule {}
