import { ethers } from 'ethers';
import ERC721ABI from '../abis/token/ERC721/ERC721Base.json';
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
export const APP_ID = address('0x1ade2613adb6bafbc65d40eb9c1effbe3bfd8b81');
export const ERC721_CONTRACT_ADDRESS =
  '0x114c1741076209268b9233d13cc6fcc8a9a750f4';

export function parseERC721BaseError(error: any) {
  const iface = new ethers.utils.Interface(ERC721ABI.abi);
  const errorResponse = iface.parseError(error.error.error.error.data);
  return errorResponse.name;
}
