import { IsString } from "class-validator";

export class CreateNftDto {
  @IsString()
  name: string;

  @IsString()
  tokenId: string;

  @IsString()
  contractAddress: string;

  @IsString()
  image: number;

  @IsString()
  metadata: string;

  @IsString()
  ownerAddress: string;
}
