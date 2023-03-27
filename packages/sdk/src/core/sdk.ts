import { ethers } from 'ethers';
import merge from 'lodash.merge';
import {
  getProviderFromUrl,
  getProviderUrl,
  getSigner,
} from '../helpers/providers';
import {
  ContractType,
  GetContractParameters,
  OpenFormatContract,
  SDKOptions,
} from '../types';
import { App } from './app';
import { BaseContract } from './base';
import { Factory } from './factory';
import { Subgraph } from './subgraph';
import { ERC20Base } from './token/ERC20/ERC20Base';
import { ERC721Base } from './token/ERC721/ERC721Base';
import { ERC721LazyMint } from './token/ERC721/ERC721LazyMint';

/**
 * Creates a new instance of the Open Format SDK
 * @public
 * @param {SDKOptions} options
 * @example
 * ```ts
 * const sdk = new OpenFormatSDK({
 *  signer: "0x....",
 *  appId: "0x1ade2613adb6bafbc65d40eb9c1effbe3bfd8b81",
 *  network: "mumbai",
 * });
 * ```
 */
export class OpenFormatSDK extends BaseContract {
  options: SDKOptions;
  factory: Factory;
  subgraph: Subgraph;
  App: App;

  static defaultOptions: SDKOptions = {
    network: 'http://localhost:8545',
    appId: '',
  };

  constructor(options?: SDKOptions) {
    super(
      getProviderFromUrl(
        getProviderUrl(merge({}, OpenFormatSDK.defaultOptions, options).network)
      ),
      ''
    );

    this.options = merge({}, OpenFormatSDK.defaultOptions, options);

    const providerUrl = getProviderUrl(this.options.network);
    this.provider = getProviderFromUrl(providerUrl);
    this.appId = this.options.appId;

    if (this.options.signer) {
      this.signer = getSigner(this.options.signer, this.provider);
    }
    this.App = new App(this.provider, this.appId, this?.signer);
    this.factory = new Factory(this.provider, this.appId, this?.signer);
    this.subgraph = new Subgraph(this.provider, this.appId, this?.signer);
  }

  async getContract({
    contractAddress,
    name,
  }: GetContractParameters): Promise<OpenFormatContract> {
    const subgraphResponse = await this.subgraph.getContractByAddressOrName({
      id: contractAddress?.toLowerCase() as string,
      name: name as string,
      appId: this.appId,
    });

    const contract = subgraphResponse.contracts[0];

    if ((contractAddress as string) === '' || name === '') {
      throw new Error('Please enter valid contract address or name');
    }

    if (contractAddress && !ethers.utils.isAddress(contractAddress as string)) {
      throw new Error('Invalid contract address');
    }

    if (!contract?.id) {
      throw new Error('Contract does not not exist');
    }

    if (subgraphResponse.contracts.length > 1) {
      const contractList = subgraphResponse.contracts.map((contract) =>
        JSON.stringify([
          { name, contractAddress: contract.id, type: ContractType },
        ])
      );
      throw new Error(
        `More than one contract found. Please use name and/or contractAddress parameter: ${contractList}`
      );
    }

    switch (contract.type) {
      case ContractType.NFT:
        return new ERC721Base(
          this.provider,
          this.appId,
          contract.id,
          this.signer
        );

      case ContractType.NFTDrop:
        return new ERC721LazyMint(
          this.provider,
          this.appId,
          contract.id,
          this.signer
        );

      case ContractType.Token:
        return new ERC20Base(
          this.provider,
          this.appId,
          contract.id,
          this.signer
        );
      default:
        throw new Error('Error getting contract');
    }
  }
}
