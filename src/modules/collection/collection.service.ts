import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCollectionDto } from "./dtos/create-collection.dto";
import { QueryCollectionDto } from "./dtos/query-collection.dto";
import { Collection } from "./schema/collection.schema";

@Injectable()
export class CollectionService {
  constructor(@InjectModel(Collection.name) private model: Model<Collection>) {}

  async findAll(query: QueryCollectionDto) {
    const result = await this.model.find();
    return {
      items: result,
    };
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOneById(id: string) {
    return await this.model.findById(id);
  }

  async create(payload: CreateCollectionDto) {
    return this.model.create(payload);
  }

  async update(id: string, payload: CreateCollectionDto) {
    return this.model.findByIdAndUpdate(id, payload);
  }

  async updateContractAddress(id: string, contractAddress: string) {
    return this.model.findByIdAndUpdate(id, { contractAddress: contractAddress, launchpad: true });
  }
}
