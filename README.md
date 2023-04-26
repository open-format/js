# What is Open Format?

Open Format is a suite of developer tools designed to assist web2 developers in creating Web3 applications on multiple EVM blockchains. With Open Format, developers can easily build decentralised applications that leverage the unique features of Web3 while enjoying a familiar development experience.

Open Format also incorporates a social conscious layer that dedicates a portion of its transaction fees to good causes, making it a socially responsible choice for developers who care about giving back to the community.

Whether you're a seasoned Web3 developer or just getting started, Open Format makes it easy to build powerful decentralised applications.

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

Create a fungible (ERC20) token on the Polygon Mumbai network, mint 1000 tokens and send to a wallet address:

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

## Setting Up Your Local Development Environment

### Clone the repository:

`git clone https://github.com/open-format/js.git`

### Install:

Yarn

`yarn install`

NPM

`npm install`

To get started with your local development environment, you have two options: using a testnet version or setting up a local version. Both options have their advantages and drawbacks, so choose the one that best suits your needs.

### Option 1: Testnet Version

The testnet version allows you to quickly set up your development environment but may result in slower test execution times. To use the testnet version, follow these steps:

1. Open the test file where the `network` is specified.
2. Replace `Chains.foundry` with either `Chains.polygonMumbai` or `Chains.auroraTestnet`.
3. Save the changes and proceed with running the tests.

### Option 2: Local Version

The local version involves running a local Ethereum network and setting up the subgraph locally using the Graph Node. This option requires more setup but offers several advantages, such as faster test execution times, easier debugging, greater control over the development environment, and no dependency on external testnets. However, it also has some drawbacks, including the need for multiple services running, a more complex setup, a deeper understanding of contracts and subgraphs, additional system resources, and an initial time investment for setup and configuration.

To set up the local version, follow these steps:

1. Set up the contracts by following the instructions the [Open Format contracts repository](https://github.com/open-format/contracts).

2. Set up the Graph Node by following the instructions in the [Graph Node repository](https://github.com/graphprotocol/graph-node). We recommend using Docker for ease of setup.

3. Set up the Open Format subgraph by following the instructions in the [Open Format subgraph repository](https://github.com/open-format/subgraph).

After completing these steps, you will have a fully functional local development environment that includes the contracts, the Graph Node, and the subgraph. You can now proceed with running the tests.
