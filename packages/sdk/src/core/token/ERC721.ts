import { ethers, Overrides, providers, Signer } from 'ethers';
import { ERC721Factory__factory } from '../../contract-types';
import { ERC721Factory } from '../../contract-types/token/ERC721';
import { poll } from '../../helpers/subgraph';
import { ContractResponse } from '../../types';
import { BaseContract } from '../base';
import { getERC721ByCreator, getERC721ByID } from '../subgraph';
import { ERC721Instance } from './ERC721Instance';

export class ERC721 extends BaseContract {
  contract: ERC721Factory;

  constructor(provider: providers.Provider, appId: string, signer?: Signer) {
    super(provider, appId, signer);

    this.contract = ERC721Factory__factory.connect(
      this.appId,
      signer || provider
    );
  }

  async create(
    params: Parameters<typeof this.contract.createERC721>,
    transactionArgs?: Overrides
  ) {
    if (!this.signer) return;

    //@TODO: Check if there is a better way of doing this?
    const tx = await this.contract.createERC721(
      params[0],
      params[1],
      params[2],
      params[3],
      { ...transactionArgs }
    );
    const receipt = await tx.wait();
    const txTimestamp = (await this.provider.getBlock(receipt.blockNumber))
      .timestamp;

    const endpoint = await this.getSubgraphEndpoint();

    const subgraphCall = async () =>
      await getERC721ByCreator({
        endpoint,
        appId: this.appId.toString(),
        createdAt: txTimestamp.toString(),
      });

    const validate = (response: ContractResponse) =>
      !!response.contracts.length;

    return await poll({
      fn: subgraphCall,
      validate,
      interval: 1000,
      maxAttempts: 20,
    }).then(
      (response) =>
        new ERC721Instance(
          this.provider,
          this.appId,
          (response as ContractResponse).contracts[0].id,
          this.signer
        )
    );
  }

  async getNFT(contractAddress: string): Promise<ERC721Instance | Error> {
    const endpoint = await this.getSubgraphEndpoint();
    const fetchERC721 = await getERC721ByID({ endpoint, id: contractAddress });

    const contractExists = fetchERC721.contracts[0]?.id;

    if (!ethers.utils.isAddress(contractAddress)) {
      throw new Error('Invalid contract address');
    }

    if (!contractExists) {
      throw new Error('Contract does not not exist');
    }

    return new ERC721Instance(
      this.provider,
      this.appId,
      contractAddress,
      this.signer
    );
  }
}
