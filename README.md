# What is Open Format?

Open Format is a suite of developer tools designed to assist web2 developers in creating Web3 applications on multiple EVM blockchains. With Open Format, developers can easily build decentralized applications that leverage the unique features of Web3 while enjoying a familiar development experience.

Open Format also incorporates a social consensus layer that dedicates a portion of its transaction fees to good causes, making it a socially responsible choice for developers who care about giving back to the community.

Whether you're a seasoned Web3 developer or just getting started, Open Format makes it easy to build powerful decentralized applications.

## Features

✅ Simple to use [Typescript SDK](https://github.com/open-format/js/tree/main/packages/sdk) for smart contract creation and management

✅ [React library](https://github.com/open-format/js/tree/main/packages/react) with smart hooks and asynchronous state management using [react-query](https://tanstack.com/query/latest/)

✅ Easy to use React Web3 wallet authentication component

✅ Token minting, transferring and burning

✅ NFT royalty support

✅ NFT Drop mechanism

✅ Reward mechanism

✅ Multi-chain support

✅ Totally decentralised

✅ Ethereum address and BigNumber validation

✅ Real-time GraphQL blockchain [API](https://api.thegraph.com/subgraphs/name/open-format/mumbai)

✅ Human readable error messages

## Examples

### Javascript

Create a fungible (ERC20) token on the Polygon Mumbai network, mint 1000 tokens and send to to a wallet address:

```ts
const sdk = new OpenFormatSDK({
  network: Chains.polygonMumbai,
  appId: "INSERT_APP_ID",
  signer: "INSERT_PRIVATE_KEY",
});

const token = await sdk.App.createToken({
  name: "My First Token",
  symbol: "MFT",
  supply: toWei("1000"),
});

await token.mint({
  to: "WALLET_ADDRESS",
  amount: toWei("1000"),
});
```

### React Hooks

Or try our React hooks library:

```tsx
const { sdk } = useOpenFormat();
const { mint, isLoading: isMinting } = useMintToken(token);

const token = await sdk.App.createToken({
  name: "My First Token",
  symbol: "MFT",
  supply: toWei("1000"),
});

// All our hooks use `react-query` under the hood.
await mint({ to: "WALLET_ADDRESS", amount: toWei("1000") });
```

### Try our [Hello new world](https://github.com/open-format/hello-world) template

Hello new world is an introduction into a new decentralised world and what we believe to be the starting point for 90% of all future applications. It features a fundamental file structure boilerplate, which comprises of an admin area, authentication, and a tokenised system with XP, Badges, and "Reward Tokens", all integrated into a front-end application built using NextJS and the Open Format SDK.

## Packages

| Package                    | Description     | Latest Version                                                                                                                                                            |
| -------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [/sdk](./packages/sdk)     | Typescript SDK  | <a href="https://www.npmjs.com/package/@openformat/sdk"><img src="https://img.shields.io/npm/v/@openformat/sdk?color=blue&label=npm&logo=npm" alt="npm version"/></a>     |
| [/react](./packages/react) | React Hooks SDK | <a href="https://www.npmjs.com/package/@openformat/react"><img src="https://img.shields.io/npm/v/@openformat/react?color=blue&label=npm&logo=npm" alt="npm version"/></a> |

## Documentation

Visit [https://docs.openformat.tech](https://docs.openformat.tech) to view documentation.

## Contributing

Our bounty program provides developers with a chance to earn by contributing to the Open Format ecosystem through completing bounties for new features and templates on our product roadmap. If you're interested in getting involved, check out our [current bounties](https://github.com/orgs/open-format/projects) to see if there are any projects that match your skills and interests.

## Community

We're building a community of talented developers who are passionate about shaping the future of the internet. We believe that collaboration and shared knowledge are absolutely essential to creating amazing things that will impact people's lives in profound ways. If you share our vision, we invite you to come be a part of something amazing on [Discord](https://discord.gg/BgkbC7Dkuf).

## Local Development

### Clone the repository:

`git clone https://github.com/open-format/js.git`

### Install:

Yarn

`yarn install`

NPM

`npm install`

### Testing:

For local testing, set up a local version of both our contracts and our subgraph, which will enable you to test and interact with them locally. If you don't want to get setup locally, you can test with Polygon Mumbai or Aurora Testnet.
