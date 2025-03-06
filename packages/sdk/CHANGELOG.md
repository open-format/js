# @openformat/sdk

## 1.5.0

### Minor Changes

- [#173](https://github.com/open-format/js/pull/173) [`dd39138`](https://github.com/open-format/js/commit/dd391380faf7def8c133424bf20f82019e083f39) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add support for new chains

## 1.4.0

### Minor Changes

- [#171](https://github.com/open-format/js/pull/171) [`2402e7d`](https://github.com/open-format/js/commit/2402e7d5be4f4642e34cf3b67e3fe8a92c9252be) Thanks [@nup9151f](https://github.com/nup9151f)! - Added support for Polygon Amoy

## 1.3.0

### Minor Changes

- [#166](https://github.com/open-format/js/pull/166) [`8223cdc`](https://github.com/open-format/js/commit/8223cdc72433e62b49ed6fdcae6f26496c6a3a5c) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Removes Fee Mechanism

  - Updates ABIs for new contracts
  - Updates naming conventions - Star to App
  - Removes createConstellation function
  - Remove constellationFactoryContracts addresses from addresses.ts

- [#169](https://github.com/open-format/js/pull/169) [`3386840`](https://github.com/open-format/js/commit/33868407549f913aee5d9ebe3aa7fe9b751faa79) Thanks [@refugene](https://github.com/refugene)! - Adds support for Arbitrum Sepolia

### Patch Changes

- [#169](https://github.com/open-format/js/pull/169) [`80e26f8`](https://github.com/open-format/js/commit/80e26f8ebc0706bc3e172d040b687b579c1e9747) Thanks [@refugene](https://github.com/refugene)! - - Remove support for old chains

- [#168](https://github.com/open-format/js/pull/168) [`fd17a28`](https://github.com/open-format/js/commit/fd17a28b2dc821ef7558fb5f1677979fda33c2e9) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Remove owner param from createApp

## 1.2.2

### Patch Changes

#### Added

- [Error types](https://github.com/open-format/js/commit/160ae695364e6dbb635a0bf79d4695c4c703cca2)
- [RequestFee functionality to BaseContract](https://github.com/open-format/js/commit/4c11c0efefeb05d7669227d61d421f9e00da1e0b)
- [call requestFee in creation and reward functions](https://github.com/open-format/js/commit/6dfbe8971259bbfbe1006168274e4ffd362923eb)

#### Updated

- [jest globalSetup script is now .ts](https://github.com/open-format/js/commit/b650c6448be738ac73e0c685b76ff641f94a5a9f)
- [update address constants](https://github.com/open-format/js/commit/5ea3dcfdff81ee9e300bbf3b867ce5a493023f76)
- [Update tests](https://github.com/open-format/js/commit/95dce2ab6e9a52b53ccf435713899a80ca4adcc6)

## 1.2.1

### Patch Changes

#### Updated

- Subgraph URL for Polygon Mumbai to improve stability and performance - [#143](https://github.com/open-format/js/pull/143)
- You can now reward multiple badges in the Reward Mechanism - [#148](https://github.com/open-format/js/pull/148)
- ActivityType is now passed as a parameter into all functions in the RewardsFacet contract
- Updated the aurora testnet StarFactory and ConstellationFactory smart contract addresses

## 1.2.0

### Minor Changes

#### Added

- new ConstellationFactory and StarFactory ABIs
- new Constellation Class for interacting with Constellations

#### Updated

- Updates RewardsFacet ABI to interact with latest Reward functionality
- Updates ERC721LazyDrop and ERC721LazyMint ABIs to handle new `endTimestamp` in claim conditions
- Renames and updates starFactoryContracts and constellationFactoryContracts mappings
- Updates subgraph mappings to latest endpoints

#### Fixed

- Correctly map Chains.foundry in chain helpers

### Patch Changes

#### Updated

- Refactor getContract function to not use subgraph - [#136](https://github.com/open-format/js/pull/136)

## 1.1.3-dev-bfd2e07

### Patch Changes

- [#134](https://github.com/open-format/js/pull/134) [`903e68b`](https://github.com/open-format/js/commit/903e68be61d9400e7b63f612ce9925ffd8eb55fb) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Get contract ids from events instead of polling subgraph

## 1.1.3-dev-05de380

### Patch Changes

- [`07781c0`](https://github.com/open-format/js/commit/07781c0af8b8f52b6b7ce63f1c01b0130d60f637) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add useSwitchNetwork hook to easily handle switching between blockchains

- [#132](https://github.com/open-format/js/pull/132) [`d3a89eb`](https://github.com/open-format/js/commit/d3a89ebe25467635988de1c0b3f0f8998e20ac5f) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Add useSwitchNetwork hook

  - Add custom polygonMumbai chain config

- [`07781c0`](https://github.com/open-format/js/commit/07781c0af8b8f52b6b7ce63f1c01b0130d60f637) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add custom chain config for polygonMumbai

## 1.1.3-dev-4037e8a

### Patch Changes

- [#123](https://github.com/open-format/js/pull/123) [`adad111`](https://github.com/open-format/js/commit/adad111bafee7605b9fe900eac4c9ee0377cc61c) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Updates polygon gas station URLs

- [#122](https://github.com/open-format/js/pull/122) [`1487bdf`](https://github.com/open-format/js/commit/1487bdfb5d578d9f0d81468b74687324ebd2fb3e) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Adds tokenURI functions to get tokenURI from ERC721Base and ERC721LazyMint contracts
  - Updates to latest ERC721 token ABIs

## 1.1.2

### Patch Changes

- [#117](https://github.com/open-format/js/pull/117) [`08b4852`](https://github.com/open-format/js/commit/08b4852d1fc97a7909ca11ea3ff6b48a89d9eef3) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Enable custom styling for Connect Button

## 1.1.0-dev-8de5595

### Minor Changes

- [#114](https://github.com/open-format/js/pull/114) [`e87147d`](https://github.com/open-format/js/commit/e87147dab409b21d2fb4f9095043bc4e416ded67) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Allow app ID to be set via a function call

## 1.0.0-dev-fee074d

### Major Changes

- [#111](https://github.com/open-format/js/pull/111) [`8f72eb1`](https://github.com/open-format/js/commit/8f72eb177eaa7e5735094d1f1c351192047978a3) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Release v1.0.0 🚀

### Patch Changes

- [#110](https://github.com/open-format/js/pull/110) [`f3167b0`](https://github.com/open-format/js/commit/f3167b0f12b63705a9c7608de83fd783afa3c7e1) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Updates batch minting fee handling

## 0.6.0-dev-c58301f

### Patch Changes

- [#108](https://github.com/open-format/js/pull/108) [`406865d`](https://github.com/open-format/js/commit/406865d5e2c7d44f8ccf637c855e5a00acb72e7d) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Remove tokenURI from Reward_CreateBadgeParams type

## 0.6.0-dev-49b851b

### Minor Changes

- [#102](https://github.com/open-format/js/pull/102) [`f0105b4`](https://github.com/open-format/js/commit/f0105b4b1cd1614ca1db465010ddb0729f3267fe) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - add functionality that handles platform and appplication fees

## 0.6.0-dev-bbe4859

### Patch Changes

- [#100](https://github.com/open-format/js/pull/100) [`2cfe657`](https://github.com/open-format/js/commit/2cfe657edc5d7e495f3d54306f83bc0d28214a15) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Fix SDK dependency versioning

## 0.6.0-dev-a2abedd

### Minor Changes

- [#98](https://github.com/open-format/js/pull/98) [`3a8d68c`](https://github.com/open-format/js/commit/3a8d68c8d3d3959d9c86d6545184cc4041762db7) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Improve contract error handling

### Patch Changes

- [#93](https://github.com/open-format/js/pull/93) [`5f010d6`](https://github.com/open-format/js/commit/5f010d68121259135b2c807aab1fc199f7cfc51c) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add and export wei helpers

## 0.3.0-dev-39bb3fa

### Patch Changes

- [#96](https://github.com/open-format/js/pull/96) [`de229bb`](https://github.com/open-format/js/commit/de229bb53844c0aa91f3ae4e0824acaeed9dc595) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - set autoConnect to true in wagmi client

## 0.3.0-dev-094b3d3

### Patch Changes

- [#94](https://github.com/open-format/js/pull/94) [`3bca926`](https://github.com/open-format/js/commit/3bca92659a99048bf4ee5351e8099b95d8b3b9d0) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Handle default network in React Hook package provider

## 0.3.0-dev-12bf41b

### Minor Changes

- [#83](https://github.com/open-format/js/pull/83) [`cd62ad0`](https://github.com/open-format/js/commit/cd62ad010c2eb320cbc8421be36c848015c247c8) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Update the network config to accept a Chain object instead of a string
  - Enable multi-chain use in React Hooks SDK

## 0.3.0-dev-1e51dda

### Minor Changes

- [#81](https://github.com/open-format/js/pull/81) [`a24081e`](https://github.com/open-format/js/commit/a24081e804440ad2f74690cbe1144bb777c902ea) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Adds functionality to interact with the Reward contract

## 0.2.1-dev-37ea060

### Patch Changes

- [#79](https://github.com/open-format/js/pull/79) [`e9b9bbb`](https://github.com/open-format/js/commit/e9b9bbbfefc9892f42b2bd2cb830ef839f82ac41) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Bump release to fix dependancy versioning

## 0.2.1-dev-ad9a567

### Patch Changes

- [#72](https://github.com/open-format/js/pull/72) [`e13f26c`](https://github.com/open-format/js/commit/e13f26ca2d8e3e0e055d00e22ac6fb2238f7b869) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Restructure the Typescript SDK to improve developer experience

  - Rename exports and classes in Typescript SDK to improve developer experience
  - Add NFTDrop mechanism

- [#76](https://github.com/open-format/js/pull/76) [`672890f`](https://github.com/open-format/js/commit/672890f1551ec2f3a37fb8452cdf555ad9c73fc8) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add support for aurora testnet

- [#74](https://github.com/open-format/js/pull/74) [`c312be1`](https://github.com/open-format/js/commit/c312be18c1403b87cf862bd940786c131b98d296) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Update React Hooks SDK to conform to new Typescript SDK structure

- [#73](https://github.com/open-format/js/pull/73) [`7d3d09a`](https://github.com/open-format/js/commit/7d3d09af3c06e2b95f84448f64fa72b1a26abe11) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Update SDK tests so they pass with the new SDK structure

## 0.2.1-dev-92a665c

### Patch Changes

- [#70](https://github.com/open-format/js/pull/70) [`dbee955`](https://github.com/open-format/js/commit/dbee955afa22e0f0ef0bbdecc8303752ec8c6f8f) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Checks the network of the signer is correct when creating apps

## 0.2.1-dev-b105321

### Patch Changes

- [#67](https://github.com/open-format/js/pull/67) [`98cda51`](https://github.com/open-format/js/commit/98cda516bf95ff27b9423b5f0809c1dc112b6d3f) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Adds an App class to access applications settings on contracts

## 0.1.0-dev-5829c32

### Patch Changes

- [#62](https://github.com/open-format/js/pull/62) [`c3f8df6`](https://github.com/open-format/js/commit/c3f8df62f05022674e58355c0ec97cff8ba51642) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add ImplementationType to ERC20 and ERC721 create functions

- [#64](https://github.com/open-format/js/pull/64) [`d96f0ca`](https://github.com/open-format/js/commit/d96f0ca347e3e5ba24acf115ecaf6c8fe3460882) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Adds aurora as a compatible chain across the SDK and React Hooks SDK

- [#61](https://github.com/open-format/js/pull/61) [`2a54f8b`](https://github.com/open-format/js/commit/2a54f8bf6668fce10c96d2908b75ea729d07d3a7) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Update ABIs for new smart contracts

## 0.1.0-dev-04dcc8a

### Minor Changes

- bef1263: ERC20 transfer functionality
- 493d303: ERC20 burn functions and hooks

## 0.1.0-dev-c33c530

### Minor Changes

- 0bfe879: ERC20 Minting functionality

## 0.1.0-dev-5820fce

### Minor Changes

- 17ad654: ERC721 approve functionality, state function wrappers
- add8572: - ERC721 burn functionality

## 0.0.5-dev-4dd8896

### Patch Changes

- eabe1c2: - Batch minting functionality

## 0.0.5-dev-f257855

### Patch Changes

- 9c5c081: - Update function commenting
  - Add `useRawRequest` hook
  - Add basic tests

## 0.0.4

### Patch Changes

- 4047076: Update Factory abi

## 0.0.3

### Patch Changes

- c0efebf: Improve factory logic

## 0.0.2

### Patch Changes

- 0e1eabf: remove postinstall scripts

## 0.0.1

### Patch Changes

- ff6f607: First release
