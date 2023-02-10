import { providers, Signer } from 'ethers';
import { ERC721Factory__factory } from '../../contract-types';
import { poll } from '../../helpers/subgraph';
import { ContractResponse } from '../../types';
import { BaseContract } from '../base';
import { getERC721ByCreator } from '../subgraph';

export class ERC721 extends BaseContract {
  constructor(provider: providers.Provider, address: string, signer: Signer) {
    super(provider, address, signer);
  }

  async create(
    name: string,
    symbol: string,
    address: string,
    royaltyBps: number
  ) {
    if (!this.signer) return;

    const contract = ERC721Factory__factory.connect(this.appId, this.signer);
    const tx = await contract.createERC721(name, symbol, address, royaltyBps);
    const receipt = await tx.wait();
    const txTimestamp = (await this.provider.getBlock(receipt.blockNumber))
      .timestamp;

    const subgraphCall = async () =>
      await getERC721ByCreator({
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
    }).then((response) => (response as ContractResponse).contracts[0].id);
  }
}
