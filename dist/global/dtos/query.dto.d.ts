import { SortOrder } from 'mongoose';
export declare class QueryDto {
    size?: number;
    page?: number;
    sortBy?: string;
    sortType?: SortOrder;
}
