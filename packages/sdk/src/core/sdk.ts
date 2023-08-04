import { ethers } from 'ethers';
import merge from 'lodash.merge';
import { Chains } from '../constants/chains';
import { getProviderFromUrl, getSigner } from '../helpers/providers';
import {
  ContractType,
  GetContractParameters,
  OpenFormatContract,
  SDKOptions,
} from '../types';
import { App } from './app';
import { BaseContract } from './base';
import { Factory } from './factory';
import { Reward } from './reward';
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
 *  network: Chains.polygonMumbai
 * });
 * ```
 */
export class OpenFormatSDK extends BaseContract {
  options: SDKOptions;
  factory: Factory;
  subgraph: Subgraph;
  Reward: Reward;
  App: App;

  static defaultOptions: SDKOptions = {
    network: Chains.polygonMumbai,
    appId: '',
  };

  constructor(options: SDKOptions) {
    super(
      getProviderFromUrl(options.network.rpcUrls.default?.http?.[0]),
      options.appId,
      options.signer
    );

    this.options = merge({}, OpenFormatSDK.defaultOptions, options);

    this.provider = getProviderFromUrl(
      this.options.network.rpcUrls.default?.http?.[0]
    );

    this.appId = this.options.appId;

    if (this.options.signer) {
      this.signer = getSigner(this.options.signer, this.provider);
    }
    this.App = new App(this.provider, this.appId, this?.signer);
    this.Reward = new Reward(this.provider, this.appId, this?.signer);
    this.factory = new Factory(this.provider, this.appId, this?.signer);
    this.subgraph = new Subgraph(this.provider, this.appId, this?.signer);
  }

  /**
   * Updates the appId of the OpenFormatSDK instance and reinstantiates
   * the App, Reward, Factory, and Subgraph objects with the new appId.
   *
   * @remarks
   * This function does not retain any states from the previous App, Reward,
   * Factory, or Subgraph instances. Use with caution as this may lead to loss
   * of previous states.
   *
   * @param appId - The new application identifier to set. This is expected to be a string.
   *
   * @example
   * const sdk = new OpenFormatSDK(sdkOptions);
   * sdk.setAppId('newAppId');
   */
  setAppId(appId: string) {
    this.appId = appId;
    this.App = new App(this.provider, appId, this?.signer);
    this.Reward = new Reward(this.provider, appId, this?.signer);
    this.factory = new Factory(this.provider, appId, this?.signer);
    this.subgraph = new Subgraph(this.provider, appId, this?.signer);
  }

  async getContract({
    contractAddress,
    type,
  }: GetContractParameters): Promise<OpenFormatContract> {
    if ((contractAddress as string) === '') {
      throw new Error('Please enter valid contract address or name');
    }

    if (contractAddress && !ethers.utils.isAddress(contractAddress as string)) {
      throw new Error('Invalid contract address');
    }

    if (!(ContractType[type] in ContractType)) {
      throw new Error('Invalid contract type');
    }

    switch (type) {
      case ContractType.NFT:
        return new ERC721Base(
          this.provider,
          this.appId,
          contractAddress,
          this.signer
        );

      case ContractType.NFTLazyMint:
        return new ERC721LazyMint(
          this.provider,
          this.appId,
          contractAddress,
          this.signer
        );

      case ContractType.Token:
        return new ERC20Base(
          this.provider,
          this.appId,
          contractAddress,
          this.signer
        );
      default:
        throw new Error('Error getting contract');
    }
  }
}
