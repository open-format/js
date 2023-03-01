import {
  BigNumber,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  providers,
  Signer,
} from 'ethers';
import { ERC721Base, ERC721Base__factory } from '../../contract-types';
import { BaseContract } from '../base';

export class ERC721Instance extends BaseContract {
  private contract: ERC721Base;

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

  async burn() {
    return 'burn()';
  }
  async transfer() {
    return 'transfer()';
  }

  async approve(
    params: Parameters<typeof this.contract.approve>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    const tx = await this.contract.approve(params[0], params[1], {
      ...transactionArgs,
    });

    const receipt = this.processTransaction(tx);
    return receipt;
  }

  async getApproved(
    params: Parameters<typeof this.contract.getApproved>,
    transactionArgs?: Overrides
  ): Promise<string> {
    const tx = await this.contract.getApproved(params[0], {
      ...transactionArgs,
    });

    return tx;
  }

  async totalSupply(transactionArgs?: Overrides): Promise<BigNumber> {
    const tx = await this.contract.totalSupply({
      ...transactionArgs,
    });

    return tx;
  }

  async balanceOf(
    params: Parameters<typeof this.contract.balanceOf>,
    transactionArgs?: Overrides
  ): Promise<BigNumber> {
    const tx = await this.contract.balanceOf(params[0], {
      ...transactionArgs,
    });

    return tx;
  }
}
