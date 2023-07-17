import { IsNumber } from 'class-validator';
import { IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from 'mongoose';

export class QueryDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  size? = 20;

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  page? = 0;

  @ApiProperty({ required: false })
  @IsOptional()
  sortBy? = 'createdAt';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(['desc', 'asc'])
  sortType?: SortOrder;
}
