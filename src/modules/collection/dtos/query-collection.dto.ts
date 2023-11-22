import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "../../../global/dtos/query.dto";

export class QueryCollectionDto extends QueryDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  status: string;
}
