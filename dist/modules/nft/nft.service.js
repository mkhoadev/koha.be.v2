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
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ethers_1 = require("ethers");
const mongoose_2 = require("mongoose");
const ERC721Launchpad_json_1 = require("../../contracts/ERC721Launchpad/ERC721Launchpad.json");
const nft_schema_1 = require("./schema/nft.schema");
let NftService = class NftService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        const result = await this.model.find();
        return {
            items: result,
        };
    }
    async getAllByAddress(address) {
        const aggregation = [];
        aggregation.push({
            $lookup: {
                from: "collections",
                localField: "contractAddress",
                foreignField: "contractAddress",
                pipeline: [
                    {
                        $match: {
                            contractAddress: address,
                        },
                    },
                ],
                as: "collection",
            },
        }, { $unwind: "$collection" });
        const result = await this.model.aggregate(aggregation);
        return {
            items: result,
        };
    }
    async findById(id) {
        return await this.model.findById(id);
    }
    async findOneById(id) {
        return await this.model.findById(id);
    }
    async create(txHash) {
        const provider = new ethers_1.ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
        const txReceipt = await provider.getTransactionReceipt(txHash);
        if (!txReceipt) {
            throw new common_1.HttpException("Contract address not found in the transaction receipt.", 3001);
        }
        const fetchPromises = txReceipt.logs.map(async (log) => {
            const contract = new ethers_1.ethers.Contract(log.address, ERC721Launchpad_json_1.abi, provider);
            const tokenId = log.topics[log.topics.length - 1];
            const [owner, metadata] = await Promise.all([
                contract.ownerOf(tokenId),
                contract.tokenURI(tokenId),
            ]);
            const res = await fetch(metadata);
            if (res.status === 200) {
                const nftImage = await res.json();
                return Object.assign(Object.assign({}, nftImage), { tokenId: +tokenId, ownerAddress: owner, contractAddress: log.address });
            }
        });
        const nftData = (await Promise.all(fetchPromises)).filter(Boolean);
        for (const data of nftData) {
            const nftExist = await this.model.findOne({
                tokenId: data.tokenId,
                contractAddress: data.contractAddress,
            });
            if (!nftExist) {
                await this.model.create(data);
            }
        }
    }
    async update(id, payload) {
        return this.model.findByIdAndUpdate(id, payload);
    }
    async updateContractAddress(id, contractAddress) {
        return this.model.findByIdAndUpdate(id, { contractAddress: contractAddress });
    }
};
NftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(nft_schema_1.Nft.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NftService);
exports.NftService = NftService;
//# sourceMappingURL=nft.service.js.map