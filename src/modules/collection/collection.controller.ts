import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ParseIdPipe } from "src/global/pipes/parseId.pipe";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dtos/create-collection.dto";
import { QueryCollectionDto } from "./dtos/query-collection.dto";

@ApiBearerAuth()
@ApiTags("COLLECTION")
@Controller("collections")
export class CollectionController {
  constructor(private readonly service: CollectionService) {}

  @Get()
  async getAll(@Query() query: QueryCollectionDto) {
    return await this.service.findAll(query);
  }

  @Get(":id")
  async findById(@Param("id", ParseIdPipe) id: string) {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateCollectionDto) {
    return await this.service.create(payload);
  }

  @Patch("/contract-address/:id")
  async updateContractAddress(@Param("id", ParseIdPipe) id: string, @Body() payload: any) {
    return await this.service.updateContractAddress(id, payload.contractAddress);
  }

  @Patch(":id")
  async update(@Param("id", ParseIdPipe) id: string, @Body() payload: CreateCollectionDto) {
    return await this.service.update(id, payload);
  }
}
