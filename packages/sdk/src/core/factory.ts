import {
  ContractReceipt,
  ContractTransaction,
  ethers,
  providers,
  Signer,
} from 'ethers';
import { factoryContracts } from '../constants';
import { Factory__factory } from '../contract-types';
import { parseErrorData } from '../helpers/transaction';
import { ContractType } from '../types';
import { BaseContract } from './base';
/**
 * A class representing a Factory contract that extends the BaseContract class.
 *
 * @class
 * @extends BaseContract
 */

export class Factory extends BaseContract {
  /**
   * The Factory contract instance.
   *
   * @type {FactoryContract}
   */

  /**
   * Create a new instance of the Factory class.
   *
   * @constructor
   * @param {providers.Provider} provider - The provider used to communicate with the blockchain.
   * @param {string} factoryAddress - The address of the Factory contract.
   * @param {Signer} [signer] - The signer used to sign transactions.
   */

  constructor(
    provider: providers.Provider,
    factoryAddress: string,
    signer?: Signer
  ) {
    super(provider, factoryAddress, signer);
  }

  /**
   * Processes a contract transaction and returns the receipt.
   *
   * @async
   * @function processTransaction
   * @param {ContractTransaction} tx - The transaction to process.
   * @returns {Promise<ContractReceipt>} The receipt of the processed transaction.
   */

  async processTransaction(tx: ContractTransaction): Promise<ContractReceipt> {
    const receipt = await tx.wait();
    return receipt;
  }

  getFactoryContractAddress(chainId: number): string {
    const factoryContract = factoryContracts[chainId];

    if (!factoryContract) {
      throw new Error(`Factory contract not found for chainId '${chainId}'`);
    }

    return factoryContract.address;
  }

  /**
   * Creates a new contract with the given name.
   *
   * @async
   * @function create
   * @param {string} name - The name of the new contract.
   * @returns {Promise<ContractReceipt>} A Promise that resolves to the transaction receipt of the contract creation.
   */

  async create(name: string): Promise<ContractReceipt> {
    try {
      const providerNetwork = await this.provider.getNetwork();
      this.checkNetworksMatch();

      const factoryAddress = this.getFactoryContractAddress(
        providerNetwork.chainId
      );

      const contract = Factory__factory.connect(
        factoryAddress,
        this.signer || this.provider
      );
      const tx = await contract.create(ethers.utils.formatBytes32String(name));

      const receipt = await this.processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.Factory);
      throw new Error(parsedError);
    }
  }
}
