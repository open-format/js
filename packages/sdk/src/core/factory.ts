import {
  ContractReceipt,
  ContractTransaction,
  ethers,
  providers,
  Signer,
} from 'ethers';
import { appFactoryContracts } from '../constants';
import { AppFactory__factory } from '../contract-types';
import { getArgumentFromEvent, parseErrorData } from '../helpers/transaction';
import { Errors } from '../types';
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

  getAppFactoryContractAddress(chainId: number): string {
    const factoryContract = appFactoryContracts[chainId];

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

  async createApp({ name }: { name: string }): Promise<{ id: string }> {
    try {
      const providerNetwork = await this.provider.getNetwork();
      this.checkNetworksMatch();

      const signerAddress = await this.signer?.getAddress();

      if (!signerAddress || !ethers.utils.isAddress(signerAddress)) {
        throw new Error(Errors.InvalidSigner);
      }

      const factoryAddress = this.getAppFactoryContractAddress(
        providerNetwork.chainId
      );

      const contract = AppFactory__factory.connect(
        factoryAddress,
        this.signer || this.provider
      );

      const tx = await contract.create(
        ethers.utils.formatBytes32String(name),
        signerAddress
      );

      const receipt = await this.processTransaction(tx);

      return {
        id: getArgumentFromEvent(receipt, contract.interface, 'Created', 0),
      };
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }
}
