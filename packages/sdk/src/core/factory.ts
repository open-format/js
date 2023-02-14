import {
  ContractReceipt,
  ContractTransaction,
  ethers,
  providers,
  Signer,
} from 'ethers';
import {
  Factory as FactoryContract,
  Factory__factory,
} from '../contract-types';
import { BaseContract } from './base';

export class Factory extends BaseContract {
  contract: FactoryContract;

  constructor(
    provider: providers.Provider,
    factoryAddress: string,
    signer?: Signer
  ) {
    super(provider, factoryAddress, signer);

    this.contract = Factory__factory.connect(
      factoryAddress,
      signer || provider
    );
  }

  async processTransaction(tx: ContractTransaction): Promise<ContractReceipt> {
    const receipt = await tx.wait();
    return receipt;
  }

  async create(name: string) {
    const tx = await this.contract.create(
      ethers.utils.formatBytes32String(name)
    );
    const receipt = await this.processTransaction(tx);
    return receipt;
  }
}
