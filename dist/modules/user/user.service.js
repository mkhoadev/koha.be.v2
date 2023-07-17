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
exports.UserService = exports.ACTIVITY_TYPE = exports.PROJECT_USER = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const crypto = require("crypto");
const ethers_1 = require("ethers");
const userStatus_enum_1 = require("./interfaces/userStatus.enum");
const uuid_1 = require("uuid");
const userRole_enum_1 = require("./interfaces/userRole.enum");
const utils_1 = require("./utils");
const mongoose_2 = require("@nestjs/mongoose");
exports.PROJECT_USER = {
    $project: {
        _id: 1,
        id: "$_id",
        username: 1,
        avatar: 1,
        address: 1,
        title: 1,
    },
};
exports.ACTIVITY_TYPE = {
    SALE: 1,
    BUY: 2,
    AUCTION: 3,
    BID: 4,
    END_AUCTION: 5,
    OPEN_BID: 6,
    END_BID: 7,
};
let UserService = class UserService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        var _a;
        const findQuery = this.model.find();
        if (query.search) {
            findQuery.or([
                { username: { $regex: ".*" + query.search + ".*", $options: "i" } },
                { title: { $regex: ".*" + query.search + ".*", $options: "i" } },
            ]);
        }
        if (query.status) {
            findQuery.where("status", query.status);
        }
        const count = await this.model.find().merge(findQuery).countDocuments();
        findQuery
            .find({ isFeatured: { $ne: false } }, { disabled: { $ne: true } }, { role: { $ne: "admin" } })
            .select("-password")
            .sort({ [query.sortBy]: (_a = query.sortType) !== null && _a !== void 0 ? _a : "desc" })
            .skip(query.page * query.size)
            .limit(query.size);
        return {
            items: await findQuery.exec(),
            paginate: {
                page: query.page,
                size: query.size,
                count,
            },
        };
    }
    async findAllUser() {
        return await this.model.find();
    }
    async findOne(id) {
        return await this.model.findById(id, { password: 0 }).exec();
    }
    async findUserById(id) {
        return await this.model.find({ _id: id, disabled: { $ne: true } }).exec();
    }
    async findOneById(id) {
        return await this.model.findById(id);
    }
    async findOneByAddress(address) {
        return await this.model.findOne({ address: address === null || address === void 0 ? void 0 : address.toUpperCase() });
    }
    async findOneByEmail(email) {
        return await this.model.findOne({ email: email }, { password: 0 }).exec();
    }
    async findOneByUsername(username, excludePassword = true) {
        return await this.model
            .findOne({ username: username }, { password: excludePassword ? 0 : 1 })
            .exec();
    }
    async findOneUser(username) {
        return await this.model
            .findOne({ username: username })
            .select(["password", "role", "address"])
            .exec();
    }
    async create(registerUser) {
        const user = await this.model.findOne({ username: registerUser.username });
        if (user)
            throw new common_1.HttpException("User already exists", common_1.HttpStatus.BAD_REQUEST);
        const newUser = new this.model(Object.assign({}, registerUser));
        newUser.password = await bcrypt.hash(registerUser.password, 10);
        const created = await newUser.save();
        return this.findOne(created.id);
    }
    async remove(id) {
        return this.model.findByIdAndRemove(id);
    }
    async update(id, payload) {
        delete payload.role;
        delete payload.address;
        if (payload.password) {
            payload.password = await bcrypt.hash(payload.password, 10);
        }
        if (payload.address) {
            payload.address = payload.address.toUpperCase();
        }
        await this.model.findByIdAndUpdate(id, payload, { new: true });
        return this.findOne(id);
    }
    async updateBlock(id, block) {
        return await this.model.findByIdAndUpdate(id, { blockNumber: block });
    }
    async createOrUpdate(payload) {
        if (!payload.address)
            throw new common_1.HttpException("address is undefined", common_1.HttpStatus.BAD_REQUEST);
        payload.address = payload.address.toUpperCase();
        const user = await this.model.findOne({
            address: payload === null || payload === void 0 ? void 0 : payload.address,
        });
        if (user) {
            return this.update(user._id, payload);
        }
        const newUser = new this.model(payload);
        const created = await newUser.save();
        return this.findOne(created.id);
    }
    async findByAddress(address) {
        return this.model
            .findOne({
            address: address,
        })
            .exec();
    }
    async findOrCreateByAddress(address) {
        let user = await this.findByAddress(address);
        if (!user) {
            user = await this.createByAddress(address);
        }
        return user;
    }
    async createByAddress(address) {
        return this.model.create({
            address: address.toUpperCase(),
            username: address,
            password: Date.now().toString(),
            email: "",
            title: "Unnamed",
            status: userStatus_enum_1.UserStatusEnum.ACTIVE,
            avatar: "",
            cover: "",
            role: userRole_enum_1.UserRoleEnum.USER,
            isCreator: false,
            twitter: "",
            website: "",
            telegram: "",
            discord: "",
        });
    }
    async findByAddressIncludeNonce(address) {
        return this.model
            .findOne({
            address: address,
        })
            .select({ nonce: 1, disabled: 1 })
            .exec();
    }
    async generateSignMessageFromAddress(address) {
        const user = await this.findByAddressIncludeNonce(address);
        let nonce = crypto.randomBytes(16).toString("base64");
        nonce = (0, ethers_1.encodeBytes32String)(nonce);
        if (user) {
            user.nonce = nonce;
            await user.save();
        }
        else {
            const newUser = new this.model({
                address: address,
                username: (0, uuid_1.v4)(),
                displayName: "Unnamed",
                nonce,
            });
            await newUser.save();
        }
        const msg = (0, utils_1.createSignMessage)((0, ethers_1.getAddress)(address), nonce);
        return msg;
    }
    async getUsersByAddress(addresses) {
        return await this.model.find({
            address: { $in: addresses.map((address) => address) },
        });
    }
    async adminGetAll(query) {
        const findQuery = this.model.find();
        if (query.search) {
            findQuery.or([{ name: { $regex: ".*" + query.search + ".*", $options: "i" } }]);
        }
        const count = await this.model.find().merge(findQuery).countDocuments();
        findQuery
            .sort({ [query.sortBy]: query.sortType })
            .skip(query.page * query.size)
            .limit(query.size);
        return {
            items: await findQuery.exec(),
            paginate: {
                page: query.page,
                size: query.size,
                count,
            },
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map