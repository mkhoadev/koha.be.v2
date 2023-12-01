import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ParseIdPipe } from "src/global/pipes/parseId.pipe";
import { CreateNftDto } from "./dtos/create-nft.dto";
import { QueryNftDto } from "./dtos/query-nft.dto";
import { NftService } from "./nft.service";

@ApiBearerAuth()
@ApiTags("NFT")
@Controller("nfts")
export class NftController {
  constructor(private readonly service: NftService) {}

  @Get()
  async getAll(@Query() query: QueryNftDto) {
    return await this.service.findAll(query);
  }

  @Get(":id")
  async findById(@Param("id", ParseIdPipe) id: string) {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() payload: any) {
    return await this.service.create(payload?.txHash);
  }

  @Patch("/contract-address/:id")
  async updateContractAddress(@Param("id", ParseIdPipe) id: string, @Body() payload: any) {
    return await this.service.updateContractAddress(id, payload.contractAddress);
  }

  @Patch(":id")
  async update(@Param("id", ParseIdPipe) id: string, @Body() payload: CreateNftDto) {
    return await this.service.update(id, payload);
  }
}
