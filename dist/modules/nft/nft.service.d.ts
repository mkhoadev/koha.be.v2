/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { CreateNftDto } from "./dtos/create-nft.dto";
import { QueryNftDto } from "./dtos/query-nft.dto";
import { Nft } from "./schema/nft.schema";
export declare class NftService {
    private model;
    constructor(model: Model<Nft>);
    findAll(query: QueryNftDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, Nft> & Nft & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getAllByAddress(address: string): Promise<{
        items: any[];
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Nft> & Nft & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneById(id: string): Promise<import("mongoose").Document<unknown, {}, Nft> & Nft & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(txHash: string): Promise<void>;
    update(id: string, payload: CreateNftDto): Promise<import("mongoose").Document<unknown, {}, Nft> & Nft & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateContractAddress(id: string, contractAddress: string): Promise<import("mongoose").Document<unknown, {}, Nft> & Nft & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
