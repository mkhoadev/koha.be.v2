import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CollectionController } from "./collection.controller";
import { CollectionService } from "./collection.service";
import { Collection, CollectionSchema } from "./schema/collection.schema";

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }])],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
