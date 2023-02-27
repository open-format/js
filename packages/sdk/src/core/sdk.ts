import merge from 'lodash.merge';
import {
  getProviderFromUrl,
  getProviderUrl,
  getSigner,
} from '../helpers/providers';
import { SDKOptions } from '../types';
import { BaseContract } from './base';
import { Factory } from './factory';
import { Subgraph } from './subgraph';
import { ERC721 } from './token/ERC721';

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
  ERC721: ERC721;
  factory: Factory;
  subgraph: Subgraph;

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
    this.ERC721 = new ERC721(this.provider, this.appId, this?.signer);
    this.factory = new Factory(this.provider, this.appId, this?.signer);
    this.subgraph = new Subgraph(this.provider, this.appId, this?.signer);
  }
}
