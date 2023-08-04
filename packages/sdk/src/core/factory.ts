import {
  ContractReceipt,
  ContractTransaction,
  ethers,
  providers,
  Signer,
} from 'ethers';
import {
  constellationFactoryContracts,
  starFactoryContracts,
} from '../constants';
import { StarFactory__factory } from '../contract-types';
import { ConstellationFactory__factory } from '../contract-types/factories/factories/ConstellationFactory__factory';
import { validateWallets } from '../helpers';
import { getArgumentFromEvent, parseErrorData } from '../helpers/transaction';
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

  getStarFactoryContractAddress(chainId: number): string {
    const factoryContract = starFactoryContracts[chainId];

    if (!factoryContract) {
      throw new Error(`Factory contract not found for chainId '${chainId}'`);
    }

    return factoryContract.address;
  }

  getConstellationFactoryContractAddress(chainId: number): string {
    const constellationFactoryContract = constellationFactoryContracts[chainId];

    if (!constellationFactoryContract) {
      throw new Error(`Factory contract not found for chainId '${chainId}'`);
    }

    return constellationFactoryContract.address;
  }

  /**
   * Creates a new contract with the given name.
   *
   * @async
   * @function create
   * @param {string} name - The name of the new contract.
   * @returns {Promise<ContractReceipt>} A Promise that resolves to the transaction receipt of the contract creation.
   */

  async createStar({
    name,
    constellation,
    owner,
  }: {
    name: string;
    constellation: string;
    owner: string;
  }): Promise<{ appAddress: string }> {
    try {
      const providerNetwork = await this.provider.getNetwork();
      this.checkNetworksMatch();

      validateWallets([constellation, owner]);

      const factoryAddress = this.getStarFactoryContractAddress(
        providerNetwork.chainId
      );

      const contract = StarFactory__factory.connect(
        factoryAddress,
        this.signer || this.provider
      );

      const tx = await contract.create(
        ethers.utils.formatBytes32String(name),
        constellation,
        owner
      );

      const receipt = await this.processTransaction(tx);
      return {
        appAddress: getArgumentFromEvent(
          receipt,
          contract.interface,
          'Created',
          0
        ),
      };
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Creates a new contract with the given name.
   *
   * @async
   * @function create
   * @param {string} name - The name of the new contract.
   * @returns {Promise<ContractReceipt>} A Promise that resolves to the transaction receipt of the contract creation.
   */

  async createConstellation({
    name,
    symbol,
    decimals,
    supply,
  }: {
    name: string;
    symbol: string;
    decimals: number;
    supply: number;
  }): Promise<{ constellationAddress: string }> {
    try {
      const providerNetwork = await this.provider.getNetwork();
      this.checkNetworksMatch();

      const factoryAddress = this.getConstellationFactoryContractAddress(
        providerNetwork.chainId
      );

      const contract = ConstellationFactory__factory.connect(
        factoryAddress,
        this.signer || this.provider
      );

      const tx = await contract.create(name, symbol, decimals, supply);

      const receipt = await this.processTransaction(tx);

      return {
        constellationAddress: getArgumentFromEvent(
          receipt,
          contract.interface,
          'Created',
          0
        ),
      };
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }
}
