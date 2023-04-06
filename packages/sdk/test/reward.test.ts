import {
  ActivityType,
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

  beforeAll(async () => {
    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
      signer: PRIVATE_KEY,
    });

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });

  it('creates a reward token with 1000 supply', async () => {
    const params: ERC20CreateParams = {
      name: 'REWARD',
      symbol: 'RWRD',
      decimal: 18,
      supply: 1000,
    };

    const token = await sdk.Reward.createRewardToken(params);
    const totalSupply = await token.totalSupply();

    expect(totalSupply).toBe(1000);
  });

  it('creates a Badge', async () => {
    const params: Reward_CreateBadgeParams = {
      name: 'REWARD',
      symbol: 'RWRD',
      tokenURI: 'ipfs://',
    };

    const tokenAddress = await sdk.Reward.createBadge(params);

    //@TODO add expect
  });

  it.only('trigger a Badge and XP', async () => {
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
          amount: 20,
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
});
