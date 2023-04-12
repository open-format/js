import { address } from '../src/helpers/validation';
// @dev Testing requires a local ethereum node and subgraph to be running. These addresses are
// used in the tests.

///////////////////
///    Wallets  ///
///////////////////

// @dev NEVER commit non local private key.
export const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

export const WALLET_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
export const WALLET_ADDRESS2 = address(
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
);
export const WALLET_ADDRESS3 = '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc';

// @TODO pull in APP_ID and TOKEN contract addresses from local subgraph.

///////////////////////////
///    Token Addresses  ///
///////////////////////////

export const APP_ID = address('0x3ddc444466c0c5f28d973dbd4fd4b157707b2356');
export const ERC721_CONTRACT_ADDRESS =
  '0xbaf7a0d9fac67b254155ff6e519a9532ffe2a67e';
export const ERC721_CONTRACT_NAME = 'my-contract';
export const ERC20_CONTRACT_ADDRESS =
  '0xc8a0c0acc1abbd8ce65df85533e8cce0ce37b478';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const NFT_DROP_CONTRACT_ADDRESS =
  '0xec115a1d018ca7f53e573bba5201c8fef6342003';
