import { ethers } from 'ethers';
import {
  ActivityType,
  Constellation,
  ContractErrors,
  ContractType,
  ERC20Base,
  ERC721Base,
  Errors,
  Reward,
  RewardTriggerParams,
  RewardType,
  toWei,
} from '../src';
import { mockLowFeeBalance } from './mocks/lowFeeBalance';
import { WALLETS } from './utilities';

describe('Reward', () => {
  let constellationToken: Constellation;
  let xpToken: ERC20Base = global.Token;
  let badgeToken: ERC721Base = global.NFT;

  beforeAll(async () => {
    constellationToken = await global.sdk.getContract({
      contractAddress: global.constellation,
      type: ContractType.Constellation,
    });
  });

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
          address: constellationToken.address(),
          amount: TRANSFER_AMOUNT,
          type: RewardType.CONSTELLATION_TOKEN,
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
    await constellationToken.approve({ spender: global.star, amount: 0 });

    const params: RewardTriggerParams = {
      receiver: WALLETS[2],
      tokens: [
        {
          id: 'connect_mission',
          address: constellationToken.address(),
          amount: TRANSFER_AMOUNT,
          type: RewardType.CONSTELLATION_TOKEN,
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

  it('should fail to trigger reward when the account has insufficient funds for transaction fees and throw a low balance error', async () => {
    mockLowFeeBalance();

    const rewardInstance = new Reward(
      global.sdk.provider,
      global.star,
      global.sdk.signer
    );

    const params: RewardTriggerParams = {
      receiver: WALLETS[1],
      tokens: [
        {
          id: 'connect',
          address: xpToken.address(),
          amount: toWei('1'),
          type: RewardType.XP_TOKEN,
          activityType: ActivityType.ACTION,
        },
      ],
    };

    // Call the trigger function and expect it to throw an error
    await expect(rewardInstance.trigger(params)).rejects.toThrow(
      Errors.LowTransactionFeeBalance
    );

    // Restore the original getFeeContract after this test
    jest.restoreAllMocks();
  });
});
