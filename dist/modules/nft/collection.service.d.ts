/// <reference types="mongoose/types/models" />
import { Model } from "mongoose";
import { Collection } from "./schema/schema";
import { QueryCollectionDto } from "./dtos/query-collection.dto";
import { CreateCollectionDto } from "./dtos/create-collection.dto";
export declare class CollectionService {
    private model;
    constructor(model: Model<Collection>);
    findAll(query: QueryCollectionDto): Promise<{
        items: any[];
    }>;
    findById(id: string): Promise<any>;
    findOneById(id: string): Promise<any>;
    create(payload: CreateCollectionDto): Promise<any>;
    update(id: string, payload: CreateCollectionDto): Promise<any>;
    updateContractAddress(id: string, contractAddress: string): Promise<any>;
}
