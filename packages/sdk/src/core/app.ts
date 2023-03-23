import { ContractReceipt, providers, Signer } from 'ethers';
import {
  SettingsFacet as SettingsContract,
  SettingsFacet__factory,
} from '../contract-types';
import { parseErrorData, processTransaction } from '../helpers/transaction';
import {
  AppHasCreatorAccessParams,
  AppSetCreatorAccessParams,
  ContractType,
} from '../types';
import { BaseContract } from './base';

/**
 * A class representing a App contract that extends the BaseContract class.
 *
 * @class
 * @extends BaseContract
 */

export class App extends BaseContract {
  /**
   * The App Settings contract instance.
   *
   * @type {SettingsContract}
   */

  private contract: SettingsContract;

  /**
   * Create a new instance of the App class.
   *
   * @constructor
   * @param {providers.Provider} provider - The provider used to communicate with the blockchain.
   * @param {string} appId - The address of the App contract.
   * @param {Signer} [signer] - The signer used to sign transactions.
   */

  constructor(provider: providers.Provider, appId: string, signer?: Signer) {
    super(provider, appId, signer);

    this.contract = SettingsFacet__factory.connect(
      this.appId,
      signer || provider
    );
  }

  /**
   * Set creator access on a specific app. This allows you to whitelist and blacklist accounts that
   * can create contract within an app.
   *
   * @async
   * @function setCreatorAccess
   * @param {string[]} params.accounts - A list of accounts.
   * @param {boolean[]} params.approvals - A list of approval states for each account
   * @returns {Promise<ContractReceipt>} A Promise that resolves to the transaction receipt of the contract creation.
   */

  async setCreatorAccess(
    params: AppSetCreatorAccessParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.setCreatorAccess(
        params.accounts,
        params.approvals,
        { ...params.overrides }
      );

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.Settings);
      throw new Error(parsedError);
    }
  }

  async hasCreatorAccess(params: AppHasCreatorAccessParams): Promise<boolean> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.hasCreatorAccess(params.account, {
        ...params.overrides,
      });

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.Settings);
      throw new Error(parsedError);
    }
  }
}
