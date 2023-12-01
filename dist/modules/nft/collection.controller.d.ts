import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dtos/create-collection.dto";
import { QueryCollectionDto } from "./dtos/query-collection.dto";
export declare class CollectionController {
    private readonly service;
    constructor(service: CollectionService);
    getAll(query: QueryCollectionDto): Promise<{
        items: any[];
    }>;
    findById(id: string): Promise<any>;
    create(payload: CreateCollectionDto): Promise<any>;
    updateContractAddress(id: string, payload: any): Promise<any>;
    update(id: string, payload: CreateCollectionDto): Promise<any>;
}
