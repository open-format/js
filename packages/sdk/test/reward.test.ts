import {
  ActivityType,
  Chains,
  ContractErrors,
  ERC20Base,
  ERC20CreateParams,
  OpenFormatSDK,
  RewardTriggerParams,
  RewardType,
  Reward_CreateBadgeParams,
} from '../src';
import {
  APP_ID,
  ERC20_CONTRACT_ADDRESS,
  ERC721_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  WALLET_ADDRESS2,
} from './utilities';

describe('Reward', () => {
  let sdk: OpenFormatSDK;
  let walletAddress: string;
  let rewardCurrency: ERC20Base;

  beforeAll(async () => {
    sdk = new OpenFormatSDK({
      network: Chains.foundry,
      appId: APP_ID,
      signer: PRIVATE_KEY,
    });

    rewardCurrency = (await sdk.getContract({
      contractAddress: ERC20_CONTRACT_ADDRESS,
    })) as ERC20Base;

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });

  it('should create a reward token with 1000 supply', async () => {
    const params: ERC20CreateParams = {
      name: 'REWARD',
      symbol: 'RWRD',
      supply: 1000,
    };

    const token = await sdk.Reward.createRewardToken(params);
    const totalSupply = await token.totalSupply();

    expect(totalSupply).toBe(1000);
  });

  it('should create a Badge', async () => {
    const params: Reward_CreateBadgeParams = {
      name: 'REWARD',
      symbol: 'RWRD',
    };

    const badge = await sdk.Reward.createBadge(params);

    //@TODO add expect
  });

  it('should trigger XP, Reward currency and a badge', async () => {
    const TRANSFER_AMOUNT = 20;

    await rewardCurrency.approve({ spender: APP_ID, amount: TRANSFER_AMOUNT });

    const params: RewardTriggerParams = {
      receiver: WALLET_ADDRESS2,
      tokens: [
        {
          id: 'connect',
          address: ERC20_CONTRACT_ADDRESS,
          amount: 10,
          type: RewardType.XP,
          activityType: ActivityType.ACTION,
        },
        {
          id: 'connect_mission',
          address: ERC20_CONTRACT_ADDRESS,
          amount: TRANSFER_AMOUNT,
          type: RewardType.REWARD_CURRENCY,
          activityType: ActivityType.MISSION,
        },
        {
          id: 'connect_mission',
          address: ERC721_CONTRACT_ADDRESS,
          amount: 1,
          type: RewardType.BADGE,
          activityType: ActivityType.MISSION,
          tokenURI: 'ipfs://',
        },
      ],
    };

    const receipt = await sdk.Reward.trigger(params);

    expect(receipt.status).toBe(1);
  });

  it('should throw an error if app does not have the allowance to transfer reward currency', async () => {
    const TRANSFER_AMOUNT = 20;
    await rewardCurrency.approve({ spender: APP_ID, amount: 0 });

    const params: RewardTriggerParams = {
      receiver: WALLET_ADDRESS2,
      tokens: [
        {
          id: 'connect_mission',
          address: ERC20_CONTRACT_ADDRESS,
          amount: TRANSFER_AMOUNT,
          type: RewardType.REWARD_CURRENCY,
          activityType: ActivityType.MISSION,
        },
      ],
    };
    async function trigger() {
      await sdk.Reward.trigger(params);
    }

    await expect(trigger).rejects.toThrow(
      ContractErrors.ERC20Base__InsufficientAllowance
    );
  });
});
