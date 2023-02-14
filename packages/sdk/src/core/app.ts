import { ContractReceipt, ContractTransaction, ethers, Signer } from 'ethers';
import { Factory, Factory__factory } from '../contract-types';
import {
  getProviderFromUrl,
  getProviderUrl,
  getSigner,
} from '../helpers/providers';

export class App {
  signer: Signer;
  factoryAddress: string;
  contract: Factory;

  constructor({
    signer,
    factoryAddress,
    network = 'localhost',
  }: {
    signer: Signer;
    factoryAddress: string;
    network?: string;
  }) {
    const providerUrl = getProviderUrl(network);
    const provider = getProviderFromUrl(providerUrl);
    this.signer = getSigner(signer, provider);
    this.factoryAddress = factoryAddress;
    this.contract = Factory__factory.connect(this.factoryAddress, this.signer);
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
