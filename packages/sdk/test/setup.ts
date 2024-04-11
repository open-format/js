require('ts-node').register({
  transpileOnly: true,
});

import { faker } from '@faker-js/faker';
import { ContractFactory, ethers } from 'ethers';
import { Chains, OpenFormatSDK, toWei } from '../src';
import { ERC20Base__factory } from '../src/contract-types';
import { WALLETS } from './utilities';
import ERC20Base from './utils/ERC20Base.json';

// @dev NEVER commit non local private key. This key is the private key for anvil local node
export const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

module.exports = async () => {
  const sdk = new OpenFormatSDK({
    network: Chains.foundry,
    appId: '',
    signer: PRIVATE_KEY,
  });

  // Create $OPEN for transaction fee requestFee;
  // Deploy the $OPEN token for transaction fees
  const ERC20BaseFactory = new ContractFactory(
    ERC20Base.abi,
    ERC20Base.data.bytecode,
    sdk.signer
  );

  const OPEN = await ERC20BaseFactory.deploy();
  await OPEN.deployed();

  if (sdk.signer) {
    global.walletAddress = await sdk.signer?.getAddress();
  }

  // Create app
  const app = await sdk.factory.createApp({
    name: faker.internet.domainWord(),
    owner: global.walletAddress,
  });

  global.app = app.id;

  global.sdk = new OpenFormatSDK({
    network: Chains.foundry,
    appId: global.app,
    signer: PRIVATE_KEY,
  });

  // Create NFT
  const NFT = await global.sdk.App.createNFT({
    name: faker.science.chemicalElement().name,
    symbol: faker.science.chemicalElement().symbol,
    royaltyBps: 1000,
    royaltyRecipient: WALLETS[0],
  });

  // Create NFTDrop
  const NFTDrop = await global.sdk.App.createNFTDrop({
    name: faker.science.chemicalElement().name,
    symbol: faker.science.chemicalElement().symbol,
    royaltyBps: 1000,
    royaltyRecipient: WALLETS[0],
  });

  // Create Token
  const Token = await global.sdk.App.createToken({
    name: 'XP',
    symbol: 'XP',
    supply: toWei('100'),
  });

  const RewardToken = await global.sdk.App.createToken({
    name: 'REWARDTOKEN',
    symbol: 'REWARDTOKEN',
    supply: toWei('100'),
  });

  const rewardTokenInstance = ERC20Base__factory.connect(
    RewardToken.address(),
    global.sdk.signer
  );

  await rewardTokenInstance.approve(global.app, ethers.constants.MaxUint256);

  global.NFT = NFT;
  global.NFTDrop = NFTDrop;
  global.Token = Token;
  global.OPEN = OPEN;
  global.RewardToken = RewardToken;

  console.log('Setup complete 🚀');
};
