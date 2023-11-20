# @openformat/react

## 1.2.2

### Patch Changes

#### Added

- Added useConnect and useDisconnect hooks - [#145](https://github.com/open-format/js/pull/145)

#### Updated

- Updated dependencies [[`cdf4f7d`](https://github.com/open-format/js/commit/cdf4f7d343cd33894f54945b58e6b80ecf8ffe27), [`9f0d51b`](https://github.com/open-format/js/commit/9f0d51b5a9580436bbcb8342ab4a899727538b4b), [`39eba80`](https://github.com/open-format/js/commit/39eba8034de8a9bb0a7b9881333d245e21ddee82), [`f702910`](https://github.com/open-format/js/commit/f702910e469ed08caaab54e4bb917234d64462dd)]:
  - @openformat/sdk@1.2.1

## 1.2.1

### Patch Changes

#### Fixed

- Issue with Wagmi client being recreated multiple times resulting in the signer being null and causing SDK contracts interactions to fail - #139

#### Removed

- Temporarily removed WalletConnectConnector from wagmi config until we migrate to a new version of Wagmi - #139

## 1.2.0

### Minor Changes

- [#138](https://github.com/open-format/js/pull/138) [`b243d62`](https://github.com/open-format/js/commit/b243d62dd08bc1eb4451eeab61c3b88c21fd21ad) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Adds new ConstellationFactory and StarFactory ABIs
  - Adds new RewardsFacet ABI
  - Adds new ERC721LazyDrop and ERC721LazyMint ABIs to handle new `endTimestamp` in claim conditions
  - Renames and updates starFactoryContracts and constellationFactoryContracts mappings
  - Updates subgraph mappings to latest endpoints
  - Adds new Constellation class
  - Fix: Correctly map Chains.foundry in chain helpers

### Patch Changes

- Updated dependencies [[`038f357`](https://github.com/open-format/js/commit/038f3578a89c55900d795e26ab6492601b8a3b34), [`b243d62`](https://github.com/open-format/js/commit/b243d62dd08bc1eb4451eeab61c3b88c21fd21ad)]:
  - @openformat/sdk@1.2.0

## 1.1.3-dev-bfd2e07

### Patch Changes

- [#134](https://github.com/open-format/js/pull/134) [`903e68b`](https://github.com/open-format/js/commit/903e68be61d9400e7b63f612ce9925ffd8eb55fb) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Get contract ids from events instead of polling subgraph

- Updated dependencies [[`903e68b`](https://github.com/open-format/js/commit/903e68be61d9400e7b63f612ce9925ffd8eb55fb)]:
  - @openformat/sdk@1.1.3-dev-bfd2e07

## 1.1.3-dev-05de380

### Patch Changes

- [`07781c0`](https://github.com/open-format/js/commit/07781c0af8b8f52b6b7ce63f1c01b0130d60f637) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add useSwitchNetwork hook to easily handle switching between blockchains

- [#132](https://github.com/open-format/js/pull/132) [`d3a89eb`](https://github.com/open-format/js/commit/d3a89ebe25467635988de1c0b3f0f8998e20ac5f) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Add useSwitchNetwork hook

  - Add custom polygonMumbai chain config

- [`07781c0`](https://github.com/open-format/js/commit/07781c0af8b8f52b6b7ce63f1c01b0130d60f637) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add custom chain config for polygonMumbai

- Updated dependencies [[`07781c0`](https://github.com/open-format/js/commit/07781c0af8b8f52b6b7ce63f1c01b0130d60f637), [`d3a89eb`](https://github.com/open-format/js/commit/d3a89ebe25467635988de1c0b3f0f8998e20ac5f), [`07781c0`](https://github.com/open-format/js/commit/07781c0af8b8f52b6b7ce63f1c01b0130d60f637)]:
  - @openformat/sdk@1.1.3-dev-05de380

## 1.1.2

### Patch Changes

- [#117](https://github.com/open-format/js/pull/117) [`08b4852`](https://github.com/open-format/js/commit/08b4852d1fc97a7909ca11ea3ff6b48a89d9eef3) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Enable custom styling for Connect Button

## 1.1.0-dev-8de5595

### Minor Changes

- [#114](https://github.com/open-format/js/pull/114) [`e87147d`](https://github.com/open-format/js/commit/e87147dab409b21d2fb4f9095043bc4e416ded67) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Allow app ID to be set via a function call

### Patch Changes

- Updated dependencies [[`e87147d`](https://github.com/open-format/js/commit/e87147dab409b21d2fb4f9095043bc4e416ded67)]:
  - @openformat/sdk@1.1.0-dev-8de5595

## 1.0.0-dev-fee074d

### Major Changes

- [#111](https://github.com/open-format/js/pull/111) [`8f72eb1`](https://github.com/open-format/js/commit/8f72eb177eaa7e5735094d1f1c351192047978a3) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Release v1.0.0 🚀

### Patch Changes

- [#110](https://github.com/open-format/js/pull/110) [`f3167b0`](https://github.com/open-format/js/commit/f3167b0f12b63705a9c7608de83fd783afa3c7e1) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Updates batch minting fee handling

- Updated dependencies [[`8f72eb1`](https://github.com/open-format/js/commit/8f72eb177eaa7e5735094d1f1c351192047978a3), [`f3167b0`](https://github.com/open-format/js/commit/f3167b0f12b63705a9c7608de83fd783afa3c7e1)]:
  - @openformat/sdk@1.0.0-dev-fee074d

## 0.3.0-dev-c58301f

### Patch Changes

- [#108](https://github.com/open-format/js/pull/108) [`406865d`](https://github.com/open-format/js/commit/406865d5e2c7d44f8ccf637c855e5a00acb72e7d) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Remove tokenURI from Reward_CreateBadgeParams type

- Updated dependencies [[`406865d`](https://github.com/open-format/js/commit/406865d5e2c7d44f8ccf637c855e5a00acb72e7d)]:
  - @openformat/sdk@0.6.0-dev-c58301f

## 0.3.0-dev-49b851b

### Minor Changes

- [#102](https://github.com/open-format/js/pull/102) [`f0105b4`](https://github.com/open-format/js/commit/f0105b4b1cd1614ca1db465010ddb0729f3267fe) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - add functionality that handles platform and appplication fees

### Patch Changes

- Updated dependencies [[`f0105b4`](https://github.com/open-format/js/commit/f0105b4b1cd1614ca1db465010ddb0729f3267fe)]:
  - @openformat/sdk@0.6.0-dev-49b851b

## 0.3.0-dev-bbe4859

### Patch Changes

- [#100](https://github.com/open-format/js/pull/100) [`2cfe657`](https://github.com/open-format/js/commit/2cfe657edc5d7e495f3d54306f83bc0d28214a15) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Fix SDK dependency versioning

- Updated dependencies [[`2cfe657`](https://github.com/open-format/js/commit/2cfe657edc5d7e495f3d54306f83bc0d28214a15)]:
  - @openformat/sdk@0.6.0-dev-bbe4859

## 0.3.0-dev-39bb3fa

### Patch Changes

- [#96](https://github.com/open-format/js/pull/96) [`de229bb`](https://github.com/open-format/js/commit/de229bb53844c0aa91f3ae4e0824acaeed9dc595) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - set autoConnect to true in wagmi client

- Updated dependencies [[`de229bb`](https://github.com/open-format/js/commit/de229bb53844c0aa91f3ae4e0824acaeed9dc595)]:
  - @openformat/sdk@0.3.0-dev-39bb3fa

## 0.3.0-dev-094b3d3

### Patch Changes

- [#94](https://github.com/open-format/js/pull/94) [`3bca926`](https://github.com/open-format/js/commit/3bca92659a99048bf4ee5351e8099b95d8b3b9d0) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Handle default network in React Hook package provider

- Updated dependencies [[`3bca926`](https://github.com/open-format/js/commit/3bca92659a99048bf4ee5351e8099b95d8b3b9d0)]:
  - @openformat/sdk@0.3.0-dev-094b3d3

## 0.3.0-dev-854232e

### Minor Changes

- [#91](https://github.com/open-format/js/pull/91) [`b2785cf`](https://github.com/open-format/js/commit/b2785cf2d29eea4a394ed85efc3952ef4f0fce3b) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Export all types from @openformat/sdk in @openformat/react

## 0.3.0-dev-12bf41b

### Minor Changes

- [#83](https://github.com/open-format/js/pull/83) [`cd62ad0`](https://github.com/open-format/js/commit/cd62ad010c2eb320cbc8421be36c848015c247c8) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - - Update the network config to accept a Chain object instead of a string
  - Enable multi-chain use in React Hooks SDK

### Patch Changes

- Updated dependencies [[`cd62ad0`](https://github.com/open-format/js/commit/cd62ad010c2eb320cbc8421be36c848015c247c8)]:
  - @openformat/sdk@0.3.0-dev-12bf41b

## 0.3.0-dev-1e51dda

### Minor Changes

- [#81](https://github.com/open-format/js/pull/81) [`a24081e`](https://github.com/open-format/js/commit/a24081e804440ad2f74690cbe1144bb777c902ea) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Adds functionality to interact with the Reward contract

### Patch Changes

- Updated dependencies [[`a24081e`](https://github.com/open-format/js/commit/a24081e804440ad2f74690cbe1144bb777c902ea)]:
  - @openformat/sdk@0.3.0-dev-1e51dda

## 0.2.1-dev-37ea060

### Patch Changes

- [#79](https://github.com/open-format/js/pull/79) [`e9b9bbb`](https://github.com/open-format/js/commit/e9b9bbbfefc9892f42b2bd2cb830ef839f82ac41) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Bump release to fix dependancy versioning

- Updated dependencies [[`e9b9bbb`](https://github.com/open-format/js/commit/e9b9bbbfefc9892f42b2bd2cb830ef839f82ac41)]:
  - @openformat/sdk@0.2.1-dev-37ea060

## 0.2.1-dev-ad9a567

### Patch Changes

- [#76](https://github.com/open-format/js/pull/76) [`672890f`](https://github.com/open-format/js/commit/672890f1551ec2f3a37fb8452cdf555ad9c73fc8) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add support for aurora testnet

- [#74](https://github.com/open-format/js/pull/74) [`c312be1`](https://github.com/open-format/js/commit/c312be18c1403b87cf862bd940786c131b98d296) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Update React Hooks SDK to conform to new Typescript SDK structure

- [#78](https://github.com/open-format/js/pull/78) [`a960c97`](https://github.com/open-format/js/commit/a960c977e1a75f9e7283ddcf7989a0d958986e59) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Add useSigner hook

- Updated dependencies [[`e13f26c`](https://github.com/open-format/js/commit/e13f26ca2d8e3e0e055d00e22ac6fb2238f7b869), [`672890f`](https://github.com/open-format/js/commit/672890f1551ec2f3a37fb8452cdf555ad9c73fc8), [`c312be1`](https://github.com/open-format/js/commit/c312be18c1403b87cf862bd940786c131b98d296), [`7d3d09a`](https://github.com/open-format/js/commit/7d3d09af3c06e2b95f84448f64fa72b1a26abe11)]:
  - @openformat/sdk@0.2.1-dev-ad9a567

## 0.2.1-dev-92a665c

### Patch Changes

- Updated dependencies [[`dbee955`](https://github.com/open-format/js/commit/dbee955afa22e0f0ef0bbdecc8303752ec8c6f8f)]:
  - @openformat/sdk@0.2.1-dev-92a665c

## 0.2.1-dev-b105321

### Patch Changes

- [#69](https://github.com/open-format/js/pull/69) [`64d9fc8`](https://github.com/open-format/js/commit/64d9fc8ccdc7f0f6ffe4450e6393db902ca8a906) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - export useOpenFormat hook to give access to all SDK functionality

- [#67](https://github.com/open-format/js/pull/67) [`98cda51`](https://github.com/open-format/js/commit/98cda516bf95ff27b9423b5f0809c1dc112b6d3f) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Adds an App class to access applications settings on contracts

- Updated dependencies [[`98cda51`](https://github.com/open-format/js/commit/98cda516bf95ff27b9423b5f0809c1dc112b6d3f)]:
  - @openformat/sdk@0.2.1-dev-b105321

## 0.1.0-dev-5829c32

### Patch Changes

- [#64](https://github.com/open-format/js/pull/64) [`d96f0ca`](https://github.com/open-format/js/commit/d96f0ca347e3e5ba24acf115ecaf6c8fe3460882) Thanks [@tinypell3ts](https://github.com/tinypell3ts)! - Adds aurora as a compatible chain across the SDK and React Hooks SDK

- Updated dependencies [[`c3f8df6`](https://github.com/open-format/js/commit/c3f8df62f05022674e58355c0ec97cff8ba51642), [`d96f0ca`](https://github.com/open-format/js/commit/d96f0ca347e3e5ba24acf115ecaf6c8fe3460882), [`2a54f8b`](https://github.com/open-format/js/commit/2a54f8bf6668fce10c96d2908b75ea729d07d3a7)]:
  - @openformat/sdk@0.1.0-dev-5829c32

## 0.1.0-dev-04dcc8a

### Minor Changes

- bef1263: ERC20 transfer functionality
- 493d303: ERC20 burn functions and hooks

### Patch Changes

- Updated dependencies [bef1263]
- Updated dependencies [493d303]
  - @openformat/sdk@0.1.0-dev-04dcc8a

## 0.1.0-dev-c33c530

### Minor Changes

- 0bfe879: ERC20 Minting functionality

### Patch Changes

- Updated dependencies [0bfe879]
  - @openformat/sdk@0.1.0-dev-c33c530

## 0.1.0-dev-5820fce

### Minor Changes

- 17ad654: ERC721 approve functionality, state function wrappers
- add8572: - ERC721 burn functionality

### Patch Changes

- Updated dependencies [17ad654]
- Updated dependencies [add8572]
  - @openformat/sdk@0.1.0-dev-5820fce

## 0.0.10-dev-4dd8896

### Patch Changes

- eabe1c2: - Batch minting functionality
- Updated dependencies [eabe1c2]
  - @openformat/sdk@0.0.5-dev-4dd8896

## 0.0.10-dev-f257855

### Patch Changes

- 9c5c081: - Update function commenting
  - Add `useRawRequest` hook
  - Add basic tests
- Updated dependencies [9c5c081]
  - @openformat/sdk@0.0.5-dev-f257855

## 0.0.9

### Patch Changes

- Updated dependencies [4047076]
  - @openformat/sdk@0.0.4

## 0.0.8

### Patch Changes

- d8992ee: rollback connectkit and wagmi versions in react package

## 0.0.7

### Patch Changes

- 07e9d61: add es modules

## 0.0.6

### Patch Changes

- 37635c4: update wagmi and connectkit dependency versions

## 0.0.5

### Patch Changes

- b7d6794: Fix package config

## 0.0.4

### Patch Changes

- c0efebf: Improve factory logic
- Updated dependencies [c0efebf]
  - @openformat/sdk@0.0.3

## 0.0.3

### Patch Changes

- 801e095: Fix @openformat/sdk dependency versioning

## 0.0.2

### Patch Changes

- 0e1eabf: remove postinstall scripts
- Updated dependencies [0e1eabf]
  - @openformat/sdk@0.0.2

## 0.0.1

### Patch Changes

- ff6f607: First release
- Updated dependencies [ff6f607]
  - @openformat/sdk@0.0.1
