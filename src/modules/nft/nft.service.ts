import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ethers } from "ethers";
import { Model } from "mongoose";
import { abi } from "../../contracts/ERC721Launchpad/ERC721Launchpad.json";
import { CreateNftDto } from "./dtos/create-nft.dto";
import { QueryNftDto } from "./dtos/query-nft.dto";
import { Nft } from "./schema/nft.schema";

@Injectable()
export class NftService {
  constructor(@InjectModel(Nft.name) private model: Model<Nft>) {}

  async findAll(query: QueryNftDto) {
    const result = await this.model.find();

    return {
      items: result,
    };
  }

  async getAllByAddress(address: string) {
    const aggregation = [];

    aggregation.push(
      {
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
      },
      { $unwind: "$collection" },
    );

    const result = await this.model.aggregate(aggregation);

    return {
      items: result,
    };
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOneById(id: string) {
    return await this.model.findById(id);
  }

  async create(txHash: string) {
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
    const txReceipt = await provider.getTransactionReceipt(txHash);

    if (!txReceipt) {
      throw new HttpException("Contract address not found in the transaction receipt.", 3001);
    }

    const fetchPromises = txReceipt.logs.map(async (log) => {
      const contract = new ethers.Contract(log.address, abi, provider);
      const tokenId = log.topics[log.topics.length - 1];
      const [owner, metadata] = await Promise.all([
        contract.ownerOf(tokenId),
        contract.tokenURI(tokenId),
      ]);

      const res = await fetch(metadata);
      if (res.status === 200) {
        const nftImage = await res.json();
        return {
          ...nftImage,
          tokenId: +tokenId,
          ownerAddress: owner,
          contractAddress: log.address,
        };
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

  async update(id: string, payload: CreateNftDto) {
    return this.model.findByIdAndUpdate(id, payload);
  }

  async updateContractAddress(id: string, contractAddress: string) {
    return this.model.findByIdAndUpdate(id, { contractAddress: contractAddress });
  }
}
