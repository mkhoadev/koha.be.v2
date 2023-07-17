import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetNonceDto {
  @IsNotEmpty()
  @ApiProperty()
  address: string;
}
