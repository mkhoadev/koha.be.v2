"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parseId_pipe_1 = require("../../global/pipes/parseId.pipe");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
const get_nonce_dto_1 = require("./dtos/get-nonce.dto");
const query_user_dto_1 = require("./dtos/query-user.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
const userRole_enum_1 = require("./interfaces/userRole.enum");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async index(query) {
        return await this.service.findAll(query);
    }
    async find(id) {
        return await this.service.findUserById(id);
    }
    async remove(id) {
        return await this.service.remove(id);
    }
    async update(id, payload, authUser) {
        if (authUser.id !== id) {
            throw new common_1.HttpException("Unauthorized", 401);
        }
        return await this.service.update(id, payload);
    }
    async createOrUpdate(payload) {
        return await this.service.createOrUpdate(payload);
    }
    async findByAddress(address) {
        return await this.service.findOrCreateByAddress(address);
    }
    async getNonce(payload) {
        return await this.service.generateSignMessageFromAddress(payload.address);
    }
    async adminGetAll(query) {
        return await this.service.adminGetAll(query);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_user_dto_1.QueryUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "get profile by ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
    }),
    (0, swagger_1.ApiParam)({ name: "id" }),
    __param(0, (0, common_1.Param)("id", parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id", parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiParam)({ name: "id" }),
    __param(0, (0, common_1.Param)("id", parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorator_1.Auth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.Get)("/address/:address"),
    __param(0, (0, common_1.Param)("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByAddress", null);
__decorate([
    (0, common_1.Post)("/nonce"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_nonce_dto_1.GetNonceDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getNonce", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRoleEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Admin get all" }),
    (0, common_1.Get)("admin/get-all"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_user_dto_1.QueryUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "adminGetAll", null);
UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("USER"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map