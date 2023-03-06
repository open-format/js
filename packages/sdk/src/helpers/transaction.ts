import { Fragment, JsonFragment } from '@ethersproject/abi';
import { ContractReceipt, ContractTransaction, ethers } from 'ethers';

export async function processTransaction(
  tx: ContractTransaction
): Promise<ContractReceipt> {
  const receipt = await tx.wait();
  return receipt;
}

export function parseErrorData(
  error: any,
  abi: string | readonly (string | JsonFragment | Fragment)[]
) {
  const iface = new ethers.utils.Interface(abi);

  //@TODO: Needs a refactor.
  // Must return: error signature, name, transaction data

  if (error?.data) {
    return iface.parseError(error.data);
  } else if (error?.error?.error?.error?.data) {
    return iface.parseError(error.error.error.error.data);
  } else if (error?.reason === 'network does not support ENS') {
    return { reason: 'Invalid wallet address' };
  } else {
    return error;
  }
}
