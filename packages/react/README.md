# Open Format React

Open Format React is an even easier way to integrate with the [Open Format SDK](https://www.github.com/js/packages/sdk) using React.

## Examples

### Fungible tokens

Fungible token creation and minting

```tsx
const { sdk } = useOpenFormat();

const token = await sdk.App.createToken({
  name: 'My First Token',
  symbol: 'MFT',
  supply: toWei('1000'),
});

// All our hooks use `react-query` under the hood.
const { mint, isLoading: isMinting } = useMintToken(token as ERC20Base);
await mint({ to: 'WALLET_ADDRESS', amount: toWei('1000') });
```

### NFTs

NFT creation and minting

```tsx
const { sdk } = useOpenFormat();

const NFT = await sdk.App.createNFT({
  name: 'My First NFT',
  symbol: 'NFT',
  royaltyRecipient: '0x123...',
  royaltyBps: 250, // 2.5%
});

// All our hooks use `react-query` under the hood.
const { mint, isLoading: isMinting } = useMintNFT(token);

await mint({
  to: 'WALLET_ADDRESS',
  tokenURI:
    'ipfs://bafkreib2ofqfcgpe5laipvgalzvf24aqbz7tmbktz36zkvt54wnkldzm2i',
});
```

### React + Next.js

From [examples/react-next](examples/react-next/) you can `yarn run start` to run the Next.js app which utiltises `@openformat/react`.

### Try our [Hello new world](https://github.com/open-format/hello-world) template

Hello new world is an introduction into a new decentralised world and what we believe to be the starting point for 90% of all future applications. It features a fundamental file structure boilerplate, which comprises of an admin area, authentication, and a tokenised system with XP, Badges, and "Reward Tokens", all integrated into a front-end application built using NextJS and the Open Format SDK.

## Quickstart

### Install dependencies:

```bash
npm install @openformat/react ethers^5
# or
yarn install @openformat/react ethers^5
# or
pnpm install @openformat/react ethers^5
```

**Please note**: ethers v6.0.0 not yet supported.

### Initialise SDK:

```tsx
import { OpenFormatProvider, Chains } from '@openformat/react';

<OpenFormatProvider
  config={{ networks: [Chains.polygonMumbai], appId: 'INSERT_APP_ID' }}
>
  {/* the rest of your app... */}
</OpenFormatProvider>;
```

### Connecting a wallet:

Before you can deploy or perform any interactions with the contract you'll want to connect a wallet.

You can allow people to connect their wallets using the `<ConnectButton />` component (which uses [Wagmi](https://wagmi.sh/) and [ConnectKit](https://docs.family.co/connectkit)) and the `useWallet` hook to get the connection state and the address of the wallet if required.

```tsx
import { ConnectButton, useWallet } from '@openformat/react';

function MyComponent() {
  const { isConnected, address } = useWallet();

  return (
    <>
      <ConnectButton />
    </>
  );
}
```

Now you can start interacting with the SDK using the `useOpenFormat()` hook.

```tsx
import { useOpenFormat } from '@openformat/react';

const { sdk } = useOpenFormat();

// Create NFT contract
await sdk.App.createNFT(params);
// Create Fungible token contract
await sdk.App.createToken(params);
// Get existing contract
await sdk.getContract(params);
```

There is also custom hooks for certain SDK interacts.

```tsx
const { sdk } = useOpenFormat();
const { mint, isLoading: isMinting } = useMintToken(token as ERC20Base);

const token = await sdk.App.createToken({
  name: 'My First Token',
  symbol: 'MFT',
  supply: toWei('1000'),
});

// All our hooks use `react-query` under the hood.
await mint({ to: 'WALLET_ADDRESS', amount: toWei('1000') });
```

## Documentation

[Quickstart](https://docs.openformat.tech/quickstart/react) - Swiftly set up your development environment.

[App](https://docs.openformat.tech/react/App/createNFT) - Learn how to create tokens, manage creator access, and handle application fees for your projects.

[NFTs](https://docs.openformat.tech/react/ERC721/useMintNFT) - Effortlessly manage your created Non-Fungible Tokens (NFTs).

[Fungible tokens](https://docs.openformat.tech/react/ERC20/useMintToken) - Seamlessly manage your created Fungible Tokens.

## Contributing

Our bounty program provides developers with a chance to earn by contributing to the Open Format ecosystem through completing bounties for new features and templates on our product roadmap. If you're interested in getting involved, check out our [current bounties](https://github.com/orgs/open-format/projects) to see if there are any projects that match your skills and interests.

## Community

We're building a community of talented developers who are passionate about shaping the future of the internet. We believe that collaboration and shared knowledge are absolutely essential to creating amazing things that will impact people's lives in profound ways. If you share our vision, we invite you to come be a part of something amazing on [Discord](https://discord.gg/BgkbC7Dkuf).
