import axios from 'axios';
import {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractReceipt,
  ContractTransaction,
  ethers,
  providers,
} from 'ethers';
import forOwn from 'lodash.forown';
import isObject from 'lodash.isobject';
import { Chains } from '../constants';
import { abis } from '../constants/contracts';
import { ContractErrors } from '../types';

export async function processTransaction(
  tx: ContractTransaction
): Promise<ContractReceipt> {
  const receipt = await tx.wait();
  return receipt;
}

export function parseErrorData(error: any) {
  const iface = new ethers.utils.Interface(abis);
  let result: BytesLike = '';

  function getSignatureHash(error: any) {
    forOwn(error, (value, key) => {
      console.log({ value });
      if (isObject(value)) {
        getSignatureHash(value);
      } else if (key === 'data') {
        if (value.length === 10) {
          result = value;
        }
      }
    });
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

export async function getPolygonGasFee(chainId: number) {
  function getURL(chainId: number): string {
    switch (chainId) {
      case Chains.polygon.id:
        return 'https://gasstation-mainnet.matic.network/v2';
      case Chains.polygonMumbai.id:
        return 'https://gasstation-mumbai.matic.today/v2';
    }
  }

  try {
    const url = getURL(chainId);
    const { data } = await axios.get(url);
    const gasPrice = ethers.utils.parseUnits(data.standard.toString(), 'gwei');

    return {
      gasPrice,
    };
  } catch (e) {
    console.log('could not fetch gas');
  }
}
