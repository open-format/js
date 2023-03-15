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
import { BaseContract } from './base';
import { Factory } from './factory';
import { Subgraph } from './subgraph';
import { ERC20 } from './token/ERC20';
import { ERC20Instance } from './token/ERC20Instance';
import { ERC721 } from './token/ERC721';
import { ERC721Instance } from './token/ERC721Instance';

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
  ERC20: ERC20;
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
    this.ERC20 = new ERC20(this.provider, this.appId, this?.signer);
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

    if (!contract.id) {
      throw new Error('Contract does not not exist');
    }

    if (subgraphResponse.contracts.length > 1) {
      const contractList = subgraphResponse.contracts.map((contract) =>
        JSON.stringify([
          { name, contractAddress: contract.id, type: contract.type },
        ])
      );
      throw new Error(
        `More than one contract found. Please use name and/or contractAddress parameter: ${contractList}`
      );
    }

    if (contract.type === ContractType.ERC721) {
      return new ERC721Instance(
        this.provider,
        this.appId,
        contract.id,
        this.signer
      );
    } else if (contract.type === ContractType.ERC20) {
      return new ERC20Instance(
        this.provider,
        this.appId,
        contract.id,
        this.signer
      );
    } else {
      throw new Error('Error getting contract');
    }
  }
}
