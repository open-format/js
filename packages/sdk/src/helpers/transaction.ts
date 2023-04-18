import {
<<<<<<< HEAD
  BytesLike,
=======
  BigNumber,
  BigNumberish,
>>>>>>> main
  ContractReceipt,
  ContractTransaction,
  ethers,
} from 'ethers';
<<<<<<< HEAD
import { forOwn, isObject } from 'lodash';
import { abis } from '../constants/contracts';
import { ContractErrors } from '../types';
=======
import ERC721LazyDropFacet from '../../abis/facet/ERC721LazyDropFacet.json';
import SettingsFacet from '../../abis/facet/SettingsFacet.json';
import Factory from '../../abis/Factory/Factory.json';
import ERC20Base from '../../abis/tokens/ERC20/ERC20Base.json';
import ERC721Base from '../../abis/tokens/ERC721/ERC721Base.json';
import ERC721LazyMint from '../../abis/tokens/ERC721/ERC721LazyMint.json';
import { ContractType } from '../types';
>>>>>>> main

export async function processTransaction(
  tx: ContractTransaction
): Promise<ContractReceipt> {
  const receipt = await tx.wait();
  return receipt;
}

<<<<<<< HEAD
export function parseErrorData(error: any) {
  const iface = new ethers.utils.Interface(abis);
  let result: BytesLike = '';

  function getSignatureHash(error: any) {
    forOwn(error, (value, key) => {
      if (isObject(value)) {
        getSignatureHash(value);
      } else if (key === 'data') {
        if (value.length === 10) {
          result = value;
        }
      }
    });
=======
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
>>>>>>> main
  }

  getSignatureHash(error);

  interface ContractErrorsInterface {
    [key: string]: number;
  }

  const contractErrorsObj =
    ContractErrors as unknown as ContractErrorsInterface;

  try {
    if (result) {
      const SigName = iface.parseError(result).name;

      if (SigName in contractErrorsObj) {
        return contractErrorsObj[SigName];
      } else {
        return 'SigHash not found in ContractErrors type';
      }
    } else {
      return error;
    }
  } catch (e: any) {
    throw Error(e);
  }
}
