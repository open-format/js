import { ethers, Transaction } from 'ethers';
import merge from 'lodash.merge';
import { OpenFormat__factory } from '../contract-types';
import { invariant } from '../helpers/invariant';
import {
  getProviderFromUrl,
  getProviderUrl,
  getSigner,
} from '../helpers/providers';
import { SDKOptions } from '../types';
import { App } from './app';
import { BaseContract } from './base';

/**
 * Creates a new instance of the Open Format SDK
 * @public
 */
export class OpenFormatSDK extends BaseContract {
  options: SDKOptions;

  static defaultOptions: SDKOptions = {
    network: 'http://localhost:8545',
  };

  constructor(options?: SDKOptions) {
    super(
      getProviderFromUrl(
        getProviderUrl(merge({}, OpenFormatSDK.defaultOptions, options).network)
      )
    );

    this.options = merge({}, OpenFormatSDK.defaultOptions, options);

    const providerUrl = getProviderUrl(this.options.network);
    this.provider = getProviderFromUrl(providerUrl);

    if (this.options.signer) {
      this.signer = getSigner(this.options.signer, this.provider);
    }
  }

  /**
   * Deploys a new Open Format Proxy contract App
   * @returns {ContractReceipt}
   */

  async createApp(transactionArgs?: Transaction) {
    invariant(this.signer, 'No signer set, cannot deploy');
    await this.checkNetworksMatch();

    //@dev deploy a proxy clone contract
    const proxyContract = new ethers.ContractFactory(
      OpenFormat__factory.abi,
      OpenFormat__factory.bytecode,
      this.signer
    );

    const nft = {
      name: 'name',
      symbol: 'symbol',
      url: 'url',
      maxSupply: 5,
      mintingPrice: 5,
    };
    const contract = await proxyContract.deploy(
      nft.name,
      nft.symbol,
      nft.url,
      nft.maxSupply,
      ethers.utils.parseEther(nft.mintingPrice.toString()),
      { ...transactionArgs }
    );
    const receipt = await contract.deployTransaction.wait();
    await contract.deployed();
    return receipt;
  }

  /**
   * Returns a new instance of an Open Format Proxy contract
   * @param {string} appId - Address of a deployed Open Format Proxy contract
   * @returns {App}
   */
  async getApp(appId: string) {
    return new App(appId, this.provider, this.signer);
  }
}
