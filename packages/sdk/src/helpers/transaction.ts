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
  return iface.parseError(error.error.error.error.data);
}
