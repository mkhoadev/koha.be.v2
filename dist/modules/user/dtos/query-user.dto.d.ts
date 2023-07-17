import { QueryDto } from '../../../global/dtos/query.dto';
import { UserFilter } from '../interfaces/userFilter.interface';
export declare class QueryUserDto extends QueryDto implements UserFilter {
    status: string;
    search: string;
}
