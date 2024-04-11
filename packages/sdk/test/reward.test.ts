import { ethers } from 'ethers';
import {
  ActivityType,
  ContractErrors,
  ERC20Base,
  ERC721Base,
  RewardTriggerParams,
  RewardType,
} from '../src';
import { WALLETS } from './utilities';

describe('Reward', () => {
  let xpToken: ERC20Base = global.Token;
  let badgeToken: ERC721Base = global.NFT;
  let rewardToken: ERC20Base = global.RewardToken;

  it('should approve and trigger multiple rewards including XP, currency, and a badge', async () => {
    const AMOUNT = ethers.utils.parseEther('1');
    const TRANSFER_AMOUNT = ethers.utils.parseEther('2');

    const params: RewardTriggerParams = {
      receiver: WALLETS[1],
      tokens: [
        {
          id: 'connect',
          address: xpToken.address(),
          amount: AMOUNT,
          type: RewardType.XP_TOKEN,
          activityType: ActivityType.ACTION,
        },
        {
          id: 'connect_mission',
          address: rewardToken.address(),
          amount: TRANSFER_AMOUNT,
          type: RewardType.REWARD_TOKEN,
          activityType: ActivityType.MISSION,
        },
        {
          id: 'connect_mission',
          address: badgeToken.address(),
          type: RewardType.BADGE,
          amount: 1,
          tokenURI: 'ipfs://',
          activityType: ActivityType.MISSION,
        },
      ],
    };

    const tx = await global.sdk.Reward.trigger(params);

    expect(tx.status).toBe(1);
  });

  it('should throw an error if app does not have the allowance to transfer reward currency', async () => {
    const TRANSFER_AMOUNT = 20;
    await rewardToken.approve({ spender: global.app, amount: 0 });

    const params: RewardTriggerParams = {
      receiver: WALLETS[2],
      tokens: [
        {
          id: 'connect_mission',
          address: rewardToken.address(),
          amount: TRANSFER_AMOUNT,
          type: RewardType.REWARD_TOKEN,
          activityType: ActivityType.MISSION,
        },
      ],
    };
    async function trigger() {
      await global.sdk.Reward.trigger(params);
    }

    await expect(trigger).rejects.toThrow(
      ContractErrors.ERC20Base__InsufficientAllowance
    );
  });
});
