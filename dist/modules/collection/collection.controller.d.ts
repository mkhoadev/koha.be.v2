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
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dtos/create-collection.dto";
import { QueryCollectionDto } from "./dtos/query-collection.dto";
export declare class CollectionController {
    private readonly service;
    constructor(service: CollectionService);
    getAll(query: QueryCollectionDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("./schema/collection.schema").Collection> & import("./schema/collection.schema").Collection & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/collection.schema").Collection> & import("./schema/collection.schema").Collection & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(payload: CreateCollectionDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/collection.schema").Collection> & import("./schema/collection.schema").Collection & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateContractAddress(id: string, payload: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/collection.schema").Collection> & import("./schema/collection.schema").Collection & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, payload: CreateCollectionDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/collection.schema").Collection> & import("./schema/collection.schema").Collection & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
