import {
  BytesLike,
  ContractReceipt,
  ContractTransaction,
  ethers,
} from 'ethers';
import { forOwn, isObject } from 'lodash';
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
        return 'SigHash not found in ContractErrors type';
      }
    } else {
      return error;
    }
  } catch (e: any) {
    throw Error(e);
  }
}
