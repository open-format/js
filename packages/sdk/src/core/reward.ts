import { ethers, type BytesLike, type providers, type Signer } from 'ethers';
import {
  RewardsFacet__factory,
  type RewardsFacet as RewardContract,
} from '../contract-types';
import type { PromiseOrValue } from '../contract-types/common';
import { parseErrorData } from '../helpers/transaction';

import {
  ActivityType,
  RewardActionType,
  RewardType,
  type ERC20CreateParams,
  type RewardTriggerParams,
  type Reward_CreateBadgeParams,
} from '../types';
import { App } from './app';
import { BaseContract } from './base';

import type { ERC20Base } from './token/ERC20/ERC20Base';

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

  async trigger(params: RewardTriggerParams[]) {
    const transactions: PromiseOrValue<BytesLike>[] = [];

    for (const param of params) {
      let tx: string;

      switch (param.rewardType) {
        case RewardType.BADGE:
          if (param.actionType === RewardActionType.MINT) {
            tx = this.contract.interface.encodeFunctionData('batchMintBadge', [
              param.address,
              param.receiver,
              param.amount,
              ethers.utils.formatBytes32String(param.id),
              ethers.utils.formatBytes32String(ActivityType.ACTION),
              ethers.utils.toUtf8Bytes(param.uri ?? ''),
            ]);
          }
          break;

        case RewardType.TOKEN:
          if (param.actionType === RewardActionType.MINT) {
            tx = this.contract.interface.encodeFunctionData('mintERC20', [
              param.address,
              param.receiver,
              param.amount,
              ethers.utils.formatBytes32String(param.id),
              ethers.utils.formatBytes32String(ActivityType.ACTION),
              ethers.utils.formatBytes32String(param.uri ?? ''),
            ]);
          } else {
            tx = this.contract.interface.encodeFunctionData('transferERC20', [
              param.address,
              param.receiver,
              param.amount,
              ethers.utils.formatBytes32String(param.id),
              ethers.utils.formatBytes32String(ActivityType.ACTION),
              ethers.utils.formatBytes32String(param.uri ?? ''),
            ]);
          }
          break;

        default:
          throw new Error(`Unsupported reward type: ${param.rewardType}`);
      }

      transactions.push(tx);
    }

    const tx = await this.contract.multicall(transactions, {
      ...(await this.getGasPrice()),
    });

    const receipt = await tx.wait();

    return { transactionHash: receipt.transactionHash };
  }
}
