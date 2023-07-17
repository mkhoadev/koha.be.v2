import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { encodeBytes32String, getAddress } from "ethers";
import { Model } from "mongoose";
import { PaginateResponse } from "src/global/interfaces/paginate.interface";
import { v4 as uuidv4 } from "uuid";
import { QueryUserDto } from "./dtos/query-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserRoleEnum } from "./interfaces/userRole.enum";
import { User } from "./schemas/user.schema";
import { createSignMessage } from "./utils";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async findAll(query: QueryUserDto): Promise<PaginateResponse<User>> {
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
      .sort({ [query.sortBy]: query.sortType ?? "desc" })
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

  async findOne(id: string) {
    return await this.model.findById(id, { password: 0 }).exec();
  }

  async findById(id: string) {
    return await this.model.find({ _id: id, disabled: { $ne: true } }).exec();
  }

  async findOneById(id: string) {
    return await this.model.findById(id);
  }

  async findOneByAddress(address: string) {
    return await this.model.findOne({ address: address?.toUpperCase() });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email: email }, { password: 0 }).exec();
  }

  async findOneByUsername(username: string, excludePassword = true) {
    return await this.model
      .findOne({ username: username }, { password: excludePassword ? 0 : 1 })
      .exec();
  }

  async findOneUser(username: string) {
    return await this.model
      .findOne({ username: username })
      .select(["password", "role", "address"])
      .exec();
  }

  async create(registerUser: RegisterUserDto): Promise<User> {
    const user = await this.model.findOne({ username: registerUser.username });

    if (user) throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);

    const newUser = new this.model({
      ...registerUser,
    });
    newUser.password = await bcrypt.hash(registerUser.password, 10);

    const created = await newUser.save();
    return this.findOne(created.id);
  }

  async remove(id: string): Promise<User> {
    return this.model.findByIdAndRemove(id);
  }

  async update(id: string, payload: UpdateUserDto) {
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

  async createOrUpdate(payload: UpdateUserDto) {
    if (!payload.address) throw new HttpException("address is undefined", HttpStatus.BAD_REQUEST);
    payload.address = payload.address.toUpperCase();

    const user: any = await this.model.findOne({
      address: payload?.address,
    });
    if (user) {
      return this.update(user._id, payload);
    }
    const newUser = new this.model(payload);
    const created = await newUser.save();
    return this.findOne(created.id);
  }

  async findByAddress(address: string) {
    return this.model
      .findOne({
        address: address,
      })
      .exec();
  }

  async findOrCreateByAddress(address: string) {
    let user = await this.findByAddress(address);

    if (!user) {
      user = await this.createByAddress(address);
    }

    return user;
  }

  async createByAddress(address: string) {
    return this.model.create({
      address: address.toUpperCase(),
      username: address,
      password: Date.now().toString(),
      email: "",
      displayName: "",
      avatar: "",
      cover: "",
      role: UserRoleEnum.USER,
    });
  }

  async findByAddressIncludeNonce(address: string) {
    return this.model
      .findOne({
        address: address,
      })
      .select({ nonce: 1, disabled: 1 })
      .exec();
  }

  async generateSignMessageFromAddress(address: string) {
    const user = await this.findByAddressIncludeNonce(address);
    let nonce = crypto.randomBytes(16).toString("base64");
    nonce = encodeBytes32String(nonce);
    if (user) {
      user.nonce = nonce;
      await user.save();
    } else {
      const newUser = new this.model({
        address: address,
        username: uuidv4(),
        displayName: "Unnamed",
        nonce,
      });
      await newUser.save();
    }

    const msg = createSignMessage(getAddress(address), nonce);
    return msg;
  }
}
