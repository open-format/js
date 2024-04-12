import axios from 'axios';
import {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractReceipt,
  ContractTransaction,
  ethers,
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
        return `SigHash: ${SigName} not found in ContractErrors type`;
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

/**
 * Asynchronously fetches the gas fee for the Polygon network.
 *
 * This function takes in a `chainId` as a parameter, uses it to determine the correct URL endpoint for fetching
 * the gas fee from the Polygon network's gas station API, and returns the gas fee as a BigNumber.
 *
 * If the function encounters an error while fetching the gas fee, it defaults to returning '31' Gwei for the Polygon mainnet
 * and '1' Gwei for the Polygon Mumbai testnet.
 *
 * @remarks
 * This function utilises the Ethers library for manipulating the fetched gas fee.
 *
 * @param chainId - The ID of the blockchain network where the transaction is taking place.
 * @returns A Promise that resolves to a BigNumber representing the gas fee in Gwei.
 * @throws Will throw an error if unable to fetch the gas fee.
 *
 * @example
 * ```typescript
 * const gasFee = await getPolygonGasFee(Chains.polygon.id);
 * console.log(gasFee.toString());
 * ```
 */
export async function getPolygonGasFee(
  chainId: typeof Chains.polygon.id
): Promise<BigNumber> {
  function getURL(chainId: typeof Chains.polygon.id) {
    switch (chainId) {
      case Chains.polygon.id:
        return 'https://gasstation.polygon.technology/v2';
    }
  }

  try {
    const url = getURL(chainId);
    const { data } = await axios.get(url);

    const priorityFee = data.fast.maxPriorityFee;
    if (priorityFee > 0) {
      const fixedFee = parseFloat(priorityFee).toFixed(9);

      return ethers.utils.parseUnits(fixedFee, 'gwei');
    }
  } catch (e) {
    console.log('could not fetch from polygon gas station');
  }

  if (chainId === Chains.polygon.id) {
    return ethers.utils.parseUnits('31', 'gwei');
  } else {
    return ethers.utils.parseUnits('1', 'gwei');
  }
}

export function getArgumentFromEvent(
  receipt: ContractReceipt,
  contractInterface: ethers.utils.Interface,
  eventName: string,
  argIndex: number
) {
  const event = contractInterface.getEvent(eventName);
  const eventTopic = contractInterface.getEventTopic(event);

  const createdEvent = receipt.logs.find((log) =>
    log.topics.includes(eventTopic)
  );

  if (!createdEvent) {
    throw new Error('Created event not found in transaction receipt');
  }

  const parsedEvent = contractInterface.parseLog(createdEvent);

  return parsedEvent.args[argIndex];
}
