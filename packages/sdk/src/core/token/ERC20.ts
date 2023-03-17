import { providers, Signer } from 'ethers';
import { ERC20Factory__factory } from '../../contract-types';
import { ERC20Factory } from '../../contract-types/ERC20';
import { poll } from '../../helpers/subgraph';
import { validateBigNumbers } from '../../helpers/validation';
import { ContractResponse, ContractType, ERC20CreateParams } from '../../types';
import { BaseContract } from '../base';
import { Subgraph } from '../subgraph';
import { ERC20Instance } from './ERC20Instance';

/**
 * Represents an ERC720 contract instance with utility methods to create an ERC20 contract
 *
 * @class ERC20
 * @extends BaseContract
 */

export class ERC20 extends BaseContract {
  contract: ERC20Factory;
  subgraph: Subgraph;

  constructor(provider: providers.Provider, appId: string, signer?: Signer) {
    super(provider, appId, signer);

    this.contract = ERC20Factory__factory.connect(
      this.appId,
      signer || provider
    );

    this.subgraph = new Subgraph(provider, appId, signer);
  }

  async create(params: ERC20CreateParams) {
    if (!this.signer) {
      throw new Error('Signer undefined');
    }

    validateBigNumbers([params.decimal, params.supply]);
    //@TODO: Check if there is a better way of doing this?
    const tx = await this.contract.createERC20(
      params.name,
      params.symbol,
      params.decimal,
      params.supply,
      { ...params.overrides }
    );
    const receipt = await tx.wait();
    const txTimestamp = (await this.provider.getBlock(receipt.blockNumber))
      .timestamp;

    const subgraphCall = async () =>
      await this.subgraph.getContractByTimestamp({
        appId: this.appId.toString(),
        createdAt: txTimestamp.toString(),
        type: ContractType.ERC20,
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
        new ERC20Instance(
          this.provider,
          this.appId,
          (response as ContractResponse).contracts[0].id,
          this.signer
        )
    );
  }
}
