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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateNftDto } from "./dtos/create-nft.dto";
import { QueryNftDto } from "./dtos/query-nft.dto";
import { NftService } from "./nft.service";
export declare class NftController {
    private readonly service;
    constructor(service: NftService);
    getAllByCollection(address: string): Promise<{
        items: any[];
    }>;
    getAll(query: QueryNftDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("./schema/nft.schema").Nft> & import("./schema/nft.schema").Nft & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/nft.schema").Nft> & import("./schema/nft.schema").Nft & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(payload: any): Promise<void>;
    updateContractAddress(id: string, payload: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/nft.schema").Nft> & import("./schema/nft.schema").Nft & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, payload: CreateNftDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/nft.schema").Nft> & import("./schema/nft.schema").Nft & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
