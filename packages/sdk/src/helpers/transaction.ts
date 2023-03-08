import { Fragment, JsonFragment } from '@ethersproject/abi';
import { ContractReceipt, ContractTransaction, ethers } from 'ethers';
import ERC20Base from '../../abis/ERC20/ERC20Base.json';
import ERC721Base from '../../abis/ERC721/ERC721Base.json';
import { ContractType } from '../types';

export async function processTransaction(
  tx: ContractTransaction
): Promise<ContractReceipt> {
  const receipt = await tx.wait();
  return receipt;
}

export function parseErrorData(error: any, contractType: ContractType) {
  let abi: any;

  switch (contractType) {
    case ContractType.ERC721:
      abi = ERC721Base.abi;
      break;
    case ContractType.ERC20:
      abi = ERC20Base.abi;
      break;
  }

  if (!abi) throw new Error("Can't determine ABI");

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
