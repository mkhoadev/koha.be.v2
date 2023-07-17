import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @Length(4, 30)
  @ApiProperty()
  username: string;

  @Length(4, 30)
  @ApiProperty()
  password: string;
}
