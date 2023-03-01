import {
  ContractReceipt,
  ContractTransaction,
  ethers,
  Overrides,
  providers,
  Signer,
} from 'ethers';
import { ERC721Base, ERC721Base__factory } from '../../contract-types';
import { validateWalletAndMetadata } from '../../helpers/validation';
import { BaseContract } from '../base';

export class ERC721Instance extends BaseContract {
  contract: ERC721Base;

  constructor(
    provider: providers.Provider,
    appId: string,
    contractAddress: string,
    signer?: Signer
  ) {
    super(provider, appId, signer);

    if (contractAddress && ethers.utils.isAddress(contractAddress)) {
      this.contract = ERC721Base__factory.connect(
        contractAddress,
        signer || provider
      );
    } else {
      throw new Error('Failed to get contract');
    }
  }

  async processTransaction(tx: ContractTransaction): Promise<ContractReceipt> {
    const receipt = await tx.wait();
    return receipt;
  }

  async mint(
    params: Parameters<typeof this.contract.mintTo>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    validateWalletAndMetadata(params[0].toString(), params[1].toString());

    const tx = await this.contract.mintTo(params[0], params[1], {
      ...transactionArgs,
    });

    const receipt = this.processTransaction(tx);
    return receipt;
  }

  async batchMint(
    params: Parameters<typeof this.contract.batchMintTo>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    validateWalletAndMetadata(params[0].toString(), params[2].toString());

    const tx = await this.contract.batchMintTo(
      params[0],
      params[1],
      params[2],
      {
        ...transactionArgs,
      }
    );

    const receipt = this.processTransaction(tx);
    return receipt;
  }
}
