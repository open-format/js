import { ContractReceipt, ContractTransaction } from 'ethers';
export async function processTransaction(
  tx: ContractTransaction
): Promise<ContractReceipt> {
  const receipt = await tx.wait();
  return receipt;
}
