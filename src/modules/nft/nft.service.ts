import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateNftDto } from "./dtos/create-nft.dto";
import { QueryNftDto } from "./dtos/query-nft.dto";
import { Nft } from "./schema/nft.schema";
import { AbiCoder, ethers } from "ethers";
import { abi } from "../../contracts/ERC721Launchpad/ERC721Launchpad.json";
import axios from "axios";

@Injectable()
export class NftService {
  constructor(@InjectModel(Nft.name) private model: Model<Nft>) {}

  async findAll(query: QueryNftDto) {
    const result = await this.model.find();

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
    const provider: any = new ethers.JsonRpcProvider(
      "https://polygon-mumbai.blockpi.network/v1/rpc/public",
    );

    const txReceipt = await provider.getTransactionReceipt(txHash);

    if (txReceipt) {
      const logs = txReceipt.logs;
      for (let i = 0; i < logs.length - 1; i++) {
        const contract = new ethers.Contract(logs[i].address, abi, provider);
        const tokenId = logs[i].topics[logs[i].topics.length - 1];
        const owner = await contract.ownerOf(tokenId);
        const metadata = await contract.tokenURI(tokenId);

        const res = await fetch(metadata);

        if (res.status === 200) {
          const nftImage = await res.json();
          const nftPayload = {
            name: nftImage.name,
            tokenId: +tokenId,
            image: nftImage.image,
            metadata: metadata,
            ownerAddress: owner,
            contractAddress: logs[i].address,
          };

          this.model.create(nftPayload);
        }
      }
      return;
    } else {
      console.log("Contract address not found in the transaction receipt.");
      return null;
    }
  }

  async update(id: string, payload: CreateNftDto) {
    return this.model.findByIdAndUpdate(id, payload);
  }

  async updateContractAddress(id: string, contractAddress: string) {
    return this.model.findByIdAndUpdate(id, { contractAddress: contractAddress });
  }
}
