import { BytesLike, ethers, providers, Signer } from 'ethers';
import {
  RewardsFacet as RewardContract,
  RewardsFacet__factory,
} from '../contract-types';
import { PromiseOrValue } from '../contract-types/common';
import { parseErrorData } from '../helpers/transaction';

import {
  ActivityType,
  ERC20CreateParams,
  RewardTriggerParams,
  RewardType,
  Reward_CreateBadgeParams,
} from '../types';
import { App } from './app';
import { BaseContract } from './base';

import { ERC20Base } from './token/ERC20/ERC20Base';

/**
 * A class representing a Reward contract that extends the BaseContract class.
 *
 * @class
 * @extends RewardContract
 */

export class Reward extends BaseContract {
  private contract: RewardContract;
  private app: App;

  /**
   * Create a new instance of the App class.
   *
   * @constructor
   * @param {providers.Provider} provider - The provider used to communicate with the blockchain.
   * @param {string} appId - The address of the App contract.
   * @param {Signer} [signer] - The signer used to sign transactions.
   */

  constructor(provider: providers.Provider, appId: string, signer?: Signer) {
    super(provider, appId, signer);

    this.app = new App(provider, appId, signer);
    this.contract = RewardsFacet__factory.connect(appId, signer || provider);
  }

  async createRewardToken(params: ERC20CreateParams): Promise<ERC20Base> {
    try {
      this.checkNetworksMatch();

      const token = await this.app.createToken({ ...params });
      return token;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async createBadge(params: Reward_CreateBadgeParams): Promise<string> {
    try {
      this.checkNetworksMatch();
      const ownerAddress = await this.signer?.getAddress();

      const token = await this.app.createNFT({
        name: params.name,
        symbol: params.symbol,
        //@ts-ignore
        royaltyRecipient: ownerAddress,
        royaltyBps: 0,
      });

      return token.address();
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async trigger(params: RewardTriggerParams) {
    let tx;
    let transactions: PromiseOrValue<BytesLike>[] = [];

    await this.requestFee();

    for (const token of params.tokens) {
      if (!Object.values(ActivityType).includes(token.activityType)) {
        throw new Error('ActivityType is not valid.');
      }

      switch (token.type) {
        case RewardType.BADGE:
          if (!token.tokenURI) throw new Error('tokenURI has not been set.');

          tx = this.contract.interface.encodeFunctionData('mintERC721', [
            token.address,
            params.receiver,
            token.amount,
            token.tokenURI,
            ethers.utils.formatBytes32String(token.id),
            ethers.utils.formatBytes32String(token.activityType),
            token.uri ?? '',
          ]);

          transactions.push(tx);
          break;

        case RewardType.CONSTELLATION_TOKEN:
          tx = this.contract.interface.encodeFunctionData('transferERC20', [
            token.address,
            params.receiver,
            token.amount,
            ethers.utils.formatBytes32String(token.id),
            ethers.utils.formatBytes32String(token.activityType),
            token.uri ?? '',
          ]);

          transactions.push(tx);
          break;

        case RewardType.XP_TOKEN:
          tx = this.contract.interface.encodeFunctionData('mintERC20', [
            token.address,
            params.receiver,
            token.amount,
            ethers.utils.formatBytes32String(token.id),
            ethers.utils.formatBytes32String(token.activityType),
            token.uri ?? '',
          ]);

          transactions.push(tx);
          break;

        default:
          throw new Error('RewardType not found.');
      }
    }

    try {
      this.checkNetworksMatch();
      const gasOverrides = await this.getGasPrice();

      if (transactions?.length) {
        const tx = await this.contract.multicall(transactions, {
          ...gasOverrides,
        });

        const receipt = tx.wait();

        return receipt;
      } else {
        throw new Error('No transactions found.');
      }
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }
}
