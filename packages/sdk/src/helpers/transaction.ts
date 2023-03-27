import { ContractReceipt, ContractTransaction, ethers } from 'ethers';
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
