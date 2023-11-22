require('ts-node').register({
  transpileOnly: true,
});

import { faker } from '@faker-js/faker';
import { ContractFactory, ethers } from 'ethers';
import { Chains, OpenFormatSDK, toWei, txFeeContractAddress } from '../src';
import { ERC20Base__factory } from '../src/contract-types';
import { WALLETS } from './utilities';
import ERC20Base from './utils/ERC20Base.json';

// @dev NEVER commit non local private key. This key is the private key for anvil local node
export const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

module.exports = async () => {
  const sdk = new OpenFormatSDK({
    network: Chains.foundry,
    starId: '',
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

  txFeeContractAddress[31337] = { address: OPEN.address };

  if (sdk.signer) {
    global.walletAddress = await sdk.signer?.getAddress();
  }

  // Create constellation
  const constellationTx = await sdk.factory.createConstellation({
    name: faker.internet.domainName(),
    symbol: faker.hacker.abbreviation(),
    decimals: 18,
    supply: toWei('100'),
  });

  global.constellation = constellationTx.constellationAddress;

  // Create star
  const starTx = await sdk.factory.createStar({
    name: faker.internet.domainWord(),
    constellation: global.constellation,
    owner: global.walletAddress,
  });

  global.star = starTx.starAddress;

  global.sdk = new OpenFormatSDK({
    network: Chains.foundry,
    starId: global.star,
    signer: PRIVATE_KEY,
  });

  const constellationInstance = ERC20Base__factory.connect(
    constellationTx.constellationAddress,
    global.sdk.signer
  );

  await constellationInstance.approve(global.star, ethers.constants.MaxUint256);

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

  global.NFT = NFT;
  global.NFTDrop = NFTDrop;
  global.Token = Token;
  global.OPEN = OPEN;

  console.log('Setup complete 🚀');
};
