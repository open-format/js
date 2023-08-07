import { ethers } from 'ethers';
import {
  Constellation,
  ContractErrors,
  ContractType,
  ERC20Base,
  ERC721Base,
  RewardTriggerParams,
  RewardType,
} from '../src';
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

  it('should trigger XP, Reward currency and a badge', async () => {
    const AMOUNT = ethers.utils.parseEther('1');
    const TRANSFER_AMOUNT = ethers.utils.parseEther('2');

    await constellationToken.approve({
      spender: global.star,
      amount: TRANSFER_AMOUNT,
    });

    const params: RewardTriggerParams = {
      receiver: WALLETS[1],
      tokens: [
        {
          id: 'connect',
          address: xpToken.address(),
          amount: AMOUNT,
          type: RewardType.XP_TOKEN,
        },
        {
          id: 'connect_mission',
          address: constellationToken.address(),
          amount: TRANSFER_AMOUNT,
          type: RewardType.CONSTELLATION_TOKEN,
        },
        {
          id: 'connect_mission',
          address: badgeToken.address(),
          type: RewardType.BADGE,
          amount: 1,
          tokenURI: 'ipfs://',
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
