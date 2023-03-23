import { ContractReceipt, ContractTransaction, ethers } from 'ethers';
import ERC20Base from '../../abis/ERC20/ERC20Base.json';
import ERC721Base from '../../abis/ERC721/ERC721Base.json';
import SettingsFacet from '../../abis/SettingsFacet/SettingsFacet.json';
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
    case ContractType.Settings:
      abi = SettingsFacet.abi;
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
