import merge from 'lodash.merge';
import {
  getProviderFromUrl,
  getProviderUrl,
  getSigner,
} from '../helpers/providers';
import { SDKOptions } from '../types';
import { BaseContract } from './base';
import { ERC721 } from './token/ERC721';

/**
 * Creates a new instance of the Open Format SDK
 * @public
 */
export class OpenFormatSDK extends BaseContract {
  options: SDKOptions;
  ERC721?: ERC721;

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
      this.ERC721 = new ERC721(this.provider, this.appId, this.signer);
    }
  }

  getNFT(address: string) {
    if (!this.signer) return 'No signer found';
    // GO FIND ADDRESS IN SUBGRAPH
    return new ERC721(this.provider, address, this.signer);
  }
}
