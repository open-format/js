import { Overrides, providers, Signer } from 'ethers';
import { ERC721Factory__factory } from '../../contract-types';
import { ERC721Factory } from '../../contract-types/token/ERC721';
import { poll } from '../../helpers/subgraph';
import { ContractResponse } from '../../types';
import { BaseContract } from '../base';
import { getERC721ByCreator } from '../subgraph';

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
