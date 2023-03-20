import { providers, Signer } from 'ethers';
import { ERC721Factory__factory } from '../../contract-types';
import { ERC721Factory } from '../../contract-types/ERC721';
import { poll } from '../../helpers/subgraph';
import { validateBigNumber, validateWallet } from '../../helpers/validation';
import {
  ContractResponse,
  ContractType,
  ERC721CreateParams,
} from '../../types';
import { BaseContract } from '../base';
import { Subgraph } from '../subgraph';
import { ERC721Instance } from './ERC721Instance';

/**
 * Represents an ERC721 contract instance with utility methods to create an ERC721 contract
 * @class ERC721
 * @extends BaseContract
 */

export class ERC721 extends BaseContract {
  contract: ERC721Factory;
  subgraph: Subgraph;

  constructor(provider: providers.Provider, appId: string, signer?: Signer) {
    super(provider, appId, signer);

    this.contract = ERC721Factory__factory.connect(
      this.appId,
      signer || provider
    );

    this.subgraph = new Subgraph(provider, appId, signer);
  }

  /**
   * Creates a new ERC721 token and deploys it to the blockchain.
   * @async
   * @function create
   * @param {string} params.name - Name of the ERC721 token.
   * @param {string} params.symbol - Symbol of the ERC721 token.
   * @param {string} params.royaltyRecipient - Address of the royalty recipient.
   * @param {BigNumber} params.royaltyBps - Royalty basis points.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ERC721Instance>} Promise that resolves to a new instance of the created ERC721 token.
   * @throws Will throw an error if the signer is undefined or if validation fails.
   */

  async create(params: ERC721CreateParams): Promise<ERC721Instance> {
    //@TODO calculateERC721FactoryDeploymentAddress when ready
    if (!this.signer) {
      throw new Error('Signer undefined');
    }

    validateWallet(params.royaltyRecipient);
    validateBigNumber(params.royaltyBps);

    const tx = await this.contract.createERC721(
      params.name,
      params.symbol,
      params.royaltyRecipient,
      params.royaltyBps,
      { ...params.overrides }
    );
    const receipt = await tx.wait();
    const txTimestamp = (await this.provider.getBlock(receipt.blockNumber))
      .timestamp;

    const subgraphCall = async () =>
      await this.subgraph.getContractByTimestamp({
        appId: this.appId.toString(),
        createdAt: txTimestamp.toString(),
        type: ContractType.ERC721,
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
}
