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
exports.CollectionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parseId_pipe_1 = require("../../global/pipes/parseId.pipe");
const collection_service_1 = require("./collection.service");
const create_collection_dto_1 = require("./dtos/create-collection.dto");
const query_collection_dto_1 = require("./dtos/query-collection.dto");
let CollectionController = class CollectionController {
    constructor(service) {
        this.service = service;
    }
    async getAll(query) {
        return await this.service.findAll(query);
    }
    async findById(id) {
        return await this.service.findById(id);
    }
    async create(payload) {
        return await this.service.create(payload);
    }
    async updateContractAddress(id, payload) {
        return await this.service.updateContractAddress(id, payload.contractAddress);
    }
    async update(id, payload) {
        return await this.service.update(id, payload);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_collection_dto_1.QueryCollectionDto]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", parseId_pipe_1.ParseIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collection_dto_1.CreateCollectionDto]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)("/contract-address/:id"),
    __param(0, (0, common_1.Param)("id", parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "updateContractAddress", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id", parseId_pipe_1.ParseIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_collection_dto_1.CreateCollectionDto]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "update", null);
CollectionController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("COLLECTION"),
    (0, common_1.Controller)("collections"),
    __metadata("design:paramtypes", [collection_service_1.CollectionService])
], CollectionController);
exports.CollectionController = CollectionController;
//# sourceMappingURL=collection.controller.js.map