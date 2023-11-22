import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ParseIdPipe } from "src/global/pipes/parseId.pipe";
import { Auth } from "../auth/decorator/auth.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";
import { GetNonceDto } from "./dtos/get-nonce.dto";
import { QueryUserDto } from "./dtos/query-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDocument } from "./schemas/user.schema";
import { UserService } from "./user.service";

@ApiBearerAuth()
@ApiTags("USER")
@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAll(@Query() query: QueryUserDto) {
    return await this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "get profile by ID" })
  @ApiResponse({
    status: 200,
  })
  @ApiParam({ name: "id" })
  async findById(@Param("id", ParseIdPipe) id: string) {
    return await this.service.findById(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id", ParseIdPipe) id: string) {
    return await this.service.remove(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "id" })
  async update(
    @Param("id", ParseIdPipe) id: string,
    @Body() payload: UpdateUserDto,
    @Auth() authUser: UserDocument,
  ) {
    if (authUser.id !== id) {
      throw new HttpException("Unauthorized", 401);
    }
    return await this.service.update(id, payload);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async createOrUpdate(@Body() payload: UpdateUserDto) {
    return await this.service.createOrUpdate(payload);
  }

  @Get("/address/:address")
  async findByAddress(@Param("address") address: string) {
    return await this.service.findOrCreateByAddress(address);
  }

  @Post("/nonce")
  async getNonce(@Body() payload: GetNonceDto) {
    return await this.service.generateSignMessageFromAddress(payload.address);
  }
}
