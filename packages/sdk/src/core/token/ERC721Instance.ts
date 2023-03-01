import {
  ContractReceipt,
  ContractTransaction,
  Overrides,
  providers,
  Signer,
} from 'ethers';
import { ERC721Base, ERC721Base__factory } from '../../contract-types';
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

    if (contractAddress) {
      this.contract = ERC721Base__factory.connect(
        contractAddress,
        signer || provider
      );
    } else {
      throw new Error('Invalid Address');
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
    const tx = await this.contract.mintTo(params[0], params[1], {
      ...transactionArgs,
    });

    const receipt = this.processTransaction(tx);
    return receipt;
  }

  async burn(
    params: Parameters<typeof this.contract.burn>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    const tx = await this.contract.burn(params[0], {
      ...transactionArgs,
    });

    const receipt = this.processTransaction(tx);
    return receipt;
  }

  async transfer() {
    return 'transfer()';
  }
}
