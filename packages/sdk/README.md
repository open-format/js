# Open Format SDK

The Open Format Typescript SDK offers a convenient method for engaging with our [smart contracts](https://github.com/open-format/contracts), serving as the lego blocks for constructing web3 applications with ease. If using React, why not check out our [React Hooks](./packages/react) library.

## Examples

### Fungible tokens

Fungible token creation and minting

```ts
const sdk = new OpenFormatSDK({
  network: Chains.arbitrumSepolia,
  appId: 'INSERT_APP_ID',
  signer: 'INSERT_PRIVATE_KEY',
});

const token = await sdk.App.createToken({
  name: 'My First Token',
  symbol: 'MFT',
  supply: toWei('1000'),
});

await token.mint({
  to: 'WALLET_ADDRESS',
  amount: toWei('1000'),
});
```

### NFTs

NFT creation and minting

```ts
const sdk = new OpenFormatSDK({
  network: Chains.arbitrumSepolia,
  appId: 'INSERT_APP_ID',
  signer: 'INSERT_PRIVATE_KEY',
});

const NFT = await sdk.App.createNFT({
  name: 'My First NFT',
  symbol: 'NFT',
  royaltyRecipient: '0x123...',
  royaltyBps: 250, // 2.5%
});

await NFT.mint({
  to: 'WALLET_ADDRESS',
  tokenURI:
    'ipfs://bafkreib2ofqfcgpe5laipvgalzvf24aqbz7tmbktz36zkvt54wnkldzm2i',
});
```

### Node.js

From [examples/node-deploy](examples/node-deploy/) you can run the various scripts to deploy, mint and try out the subgraph which utilises `@openformat/sdk`.

## Quickstart

### Install dependencies:

```bash
npm install @openformat/sdk ethers^5
# or
yarn install @openformat/sdk ethers^5
# or
pnpm install @openformat/sdk ethers^5
```

**Please note**: ethers v6.0.0 not yet supported.

### Initialise SDK:

```ts
import { OpenFormatSDK, Chains } from '@openformat/sdk';

const sdk = new OpenFormatSDK({
  // Choose which blockchain you would like to use
  network: Chains.arbitrumSepolia,
  // Go to https://apps.openformat.tech/ to generate App
  appId: 'INSERT_APP_ID',
  // Private key for sign transactions
  signer: 'INSERT_PRIVATE_KEY',
});
```

### Now you have access to all SDK functionality.

```ts
// Create NFT contract
await sdk.App.createNFT(params);
// Create Fungible token contract
await sdk.App.createToken(params);
// Get existing contract
await sdk.getContract(params);
```

## Documentation

[Quickstart](https://docs.openformat.tech/quickstart/typescript) - Swiftly set up your development environment.

[App](https://docs.openformat.tech/typescript/App/createNFT) - Learn how to create tokens, manage creator access, and handle application fees for your projects.

[NFTs](https://docs.openformat.tech/typescript/ERC721/mint) - Effortlessly manage your created Non-Fungible Tokens (NFTs).

[Fungible tokens](https://docs.openformat.tech/typescript/ERC20/mint) - Seamlessly manage your created Fungible Tokens.

## Contributing

Our bounty program provides developers with a chance to earn by contributing to the Open Format ecosystem through completing bounties for new features and templates on our product roadmap. If you're interested in getting involved, check out our [current bounties](https://github.com/orgs/open-format/projects) to see if there are any projects that match your skills and interests.

## Community

We're building a community of talented developers who are passionate about shaping the future of the internet. We believe that collaboration and shared knowledge are absolutely essential to creating amazing things that will impact people's lives in profound ways. If you share our vision, we invite you to come be a part of something amazing on [Discord](https://discord.gg/BgkbC7Dkuf).
