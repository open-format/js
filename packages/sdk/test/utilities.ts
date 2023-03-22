import { address } from '../src/helpers/validation';
// @dev Testing requires a local ethereum node and subgraph to be running. These addresses are
// used in the tests
export const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
export const WALLET_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
export const WALLET_ADDRESS2 = address(
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
);
export const WALLET_ADDRESS3 = '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc';
export const APP_ID = address('0x5d82b25122a071513d45e84552913275d7e7e94f');
export const ERC721_CONTRACT_ADDRESS =
  '0xdf61ef41cb822f96c35d66c0b1099eef5b99a2cd';
export const ERC721_CONTRACT_NAME = 'My collectionss';
export const ERC20_CONTRACT_ADDRESS =
  '0xf858f5fa5bfaa12bd3e07ac49308ba86cee4c71a';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
