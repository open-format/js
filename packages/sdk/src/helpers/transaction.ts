import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  ethers,
} from 'ethers';
import ERC721LazyDropFacet from '../../abis/facet/ERC721LazyDropFacet.json';
import SettingsFacet from '../../abis/facet/SettingsFacet.json';
import Factory from '../../abis/Factory/Factory.json';
import ERC20Base from '../../abis/tokens/ERC20/ERC20Base.json';
import ERC721Base from '../../abis/tokens/ERC721/ERC721Base.json';
import ERC721LazyMint from '../../abis/tokens/ERC721/ERC721LazyMint.json';
import { ContractType } from '../types';

export async function processTransaction(
  tx: ContractTransaction
): Promise<ContractReceipt> {
  const receipt = await tx.wait();
  return receipt;
}

/**
 * Convert a decimal Ether amount (ETH) to its smallest unit (wei) as a BigNumber.
 *
 * @param {string} amount - The decimal Ether amount to be converted to wei.
 * @returns {BigNumber} The converted wei amount as a BigNumber instance.
 *
 * @example
 * const decimalAmount = "0.01";
 * const weiAmount = toWei(decimalAmount);
 * console.log(weiAmount.toString()); // "10000000000000000"
 */
export function toWei(amount: string): BigNumber {
  return ethers.utils.parseEther(amount);
}

/**
 * Convert a wei amount as a BigNumber to its decimal Ether representation (ETH) as a string.
 *
 * @param {BigNumberish} amount - The wei amount to be converted to decimal Ether.
 * @returns {string} The converted decimal Ether amount as a string.
 *
 * @example
 * const weiAmount = "10000000000000000"
 * const decimalAmount = fromWei(weiAmount);
 * console.log(decimalAmount); // "0.01"
 */
export function fromWei(amount: BigNumberish): string {
  return ethers.utils.formatEther(amount);
}

export function parseErrorData(error: any, contractType: ContractType) {
  let abi: any;

  switch (contractType) {
    case ContractType.NFT:
      abi = ERC721Base.abi;
      break;
    case ContractType.NFTLazyMint:
      abi = ERC721LazyMint.abi;
      break;
    case ContractType.NFTDrop:
      abi = ERC721LazyDropFacet.abi;
      break;
    case ContractType.Token:
      abi = ERC20Base.abi;
      break;
    case ContractType.Settings:
      abi = SettingsFacet.abi;
      break;
    case ContractType.Factory:
      abi = Factory.abi;
      break;
  }

  if (!abi) throw new Error("Can't determine ABI");

  const iface = new ethers.utils.Interface(abi);

  //@TODO: Needs a refactor. What happens if the error is on the Proxy?
  // Must return: error signature, name, transaction data

  if (error?.data) {
    if (iface.parseError(error.data)) return iface.parseError(error.data).name;
  } else if (error?.error?.error?.error?.data) {
    if (iface.parseError(error.error.error.error.data))
      return iface.parseError(error.error.error.error.data).name;
  } else if (error?.reason === 'network does not support ENS') {
    return 'Invalid wallet address';
  } else if (error?.reason) {
    return error.reason;
  } else {
    return error;
  }
}
