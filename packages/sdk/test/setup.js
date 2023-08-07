import { faker } from '@faker-js/faker';
import { Chains, OpenFormatSDK } from '../src';

// @dev NEVER commit non local private key. This key is the private key for anvil local node
export const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

module.exports = async () => {
  const sdk = new OpenFormatSDK({
    network: Chains.foundry,
    starId: '',
    signer: PRIVATE_KEY,
  });

  if (sdk.signer) {
    global.walletAddress = await sdk.signer?.getAddress();
  }

  // Create constellation
  const constellationTx = await sdk.factory.createConstellation({
    name: faker.internet.domainName(),
    symbol: faker.hacker.abbreviation(),
    decimals: 18,
    supply: 1000,
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
};
