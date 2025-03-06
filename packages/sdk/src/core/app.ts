import {
  ethers,
  type BigNumber,
  type BigNumberish,
  type ContractReceipt,
  type providers,
  type Signer,
} from 'ethers';
import {
  ERC20FactoryFacet__factory,
  ERC721FactoryFacet__factory,
  ERC721LazyDropFacet__factory,
  SettingsFacet__factory,
  type ERC20FactoryFacet as ERC20FactoryContract,
  type ERC721FactoryFacet as ERC721FactoryContract,
  type ERC721LazyDropFacet as ERC721LazyDropFacetContract,
  type SettingsFacet as SettingsContract,
} from '../contract-types';
import {
  getArgumentFromEvent,
  parseErrorData,
  processTransaction,
} from '../helpers/transaction';
import { validateBigNumbers, validateWallet } from '../helpers/validation';
import {
  ImplementationType,
  type AppHasCreatorAccessParams,
  type AppSetAcceptedCurrenciesParams,
  type AppSetApplicationFeeParams,
  type AppSetCreatorAccessParams,
  type ERC20CreateParams,
  type ERC721CreateParams,
} from '../types';
import { BaseContract } from './base';
import { Subgraph } from './subgraph';
import { ERC20Base } from './token/ERC20/ERC20Base';
import { ERC721Badge } from './token/ERC721/ERC721Badge';
import { ERC721Base } from './token/ERC721/ERC721Base';
import { ERC721LazyMint } from './token/ERC721/ERC721LazyMint';

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

  private settings: SettingsContract;
  private ERC721Factory: ERC721FactoryContract;
  private ERC20Factory: ERC20FactoryContract;
  private ERC721LazyDrop: ERC721LazyDropFacetContract;
  private subgraph: Subgraph;

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

    this.settings = SettingsFacet__factory.connect(
      this.appId,
      signer || provider
    );

    this.subgraph = new Subgraph(provider, appId, signer);

    this.ERC20Factory = ERC20FactoryFacet__factory.connect(
      this.appId,
      signer || provider
    );
    this.ERC721Factory = ERC721FactoryFacet__factory.connect(
      this.appId,
      signer || provider
    );

    this.ERC721LazyDrop = ERC721LazyDropFacet__factory.connect(
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
      const gasOverrides = await this.getGasPrice();

      const tx = await this.settings.setCreatorAccess(
        params.accounts,
        params.approvals,
        { ...gasOverrides, ...params.overrides }
      );

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async hasCreatorAccess(params: AppHasCreatorAccessParams): Promise<boolean> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.settings.hasCreatorAccess(params.account, {
        ...params.overrides,
      });

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async setAcceptedCurrencies(
    params: AppSetAcceptedCurrenciesParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      const gasOverrides = await this.getGasPrice();

      const tx = await this.settings.setAcceptedCurrencies(
        params.currencies,
        params.approvals,
        {
          ...gasOverrides,
          ...params.overrides,
        }
      );

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async setApplicationFee(params: AppSetApplicationFeeParams) {
    try {
      await this.checkNetworksMatch();
      const gasOverrides = await this.getGasPrice();

      const tx = await this.settings.setApplicationFee(
        params.percentageBPS,
        params.recipient,
        {
          ...gasOverrides,
          ...params.overrides,
        }
      );

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async platformFeeInfo(
    _amount: BigNumberish
  ): Promise<{ recipient: string; platformFee: BigNumber }> {
    try {
      await this.checkNetworksMatch();

      const { recipient, amount: platformFee } =
        await this.settings.platformFeeInfo(_amount);

      return { recipient, platformFee };
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async applicationFeeInfo(
    _amount: BigNumberish
  ): Promise<{ recipient: string; applicationFee: BigNumber }> {
    try {
      await this.checkNetworksMatch();

      const { recipient, amount: applicationFee } =
        await this.settings.applicationFeeInfo(_amount);

      return { recipient, applicationFee };
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async createNFT(
    params: ERC721CreateParams
  ): Promise<ERC721Base | ERC721Badge> {
    try {
      if (!this.signer) {
        throw new Error('Signer undefined');
      }

      await this.checkNetworksMatch();

      validateWallet(params.royaltyRecipient);
      validateBigNumbers([params.royaltyBps]);

      const gasOverrides = await this.getGasPrice();

      const { platformFee } = await this.platformFeeInfo(0);

      let tx;
      switch (params.implementationType) {
        case ImplementationType.BADGE:
          tx = await this.ERC721Factory.createERC721(
            params.name,
            params.symbol,
            params.royaltyRecipient,
            params.royaltyBps,
            ethers.utils.formatBytes32String(ImplementationType.BADGE),
            { ...gasOverrides, ...params.overrides, value: platformFee }
          );
          break;
        default:
          tx = await this.ERC721Factory.createERC721(
            params.name,
            params.symbol,
            params.royaltyRecipient,
            params.royaltyBps,
            ethers.utils.formatBytes32String(ImplementationType.BASE),
            { ...gasOverrides, ...params.overrides, value: platformFee }
          );
          break;
      }

      const receipt = await tx.wait();
      const contractId = getArgumentFromEvent(
        receipt,
        this.ERC721Factory.interface,
        'Created',
        0
      );

      switch (params.implementationType) {
        case ImplementationType.BADGE:
          return new ERC721Badge(
            this.provider,
            this.appId,
            contractId,
            this.signer
          );
        default:
          return new ERC721Base(
            this.provider,
            this.appId,
            contractId,
            this.signer
          );
      }
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async createNFTDrop(params: ERC721CreateParams): Promise<ERC721LazyMint> {
    try {
      if (!this.signer) {
        throw new Error('Signer undefined');
      }

      await this.checkNetworksMatch();

      validateWallet(params.royaltyRecipient);
      validateBigNumbers([params.royaltyBps]);

      const gasOverrides = await this.getGasPrice();

      const { platformFee } = await this.platformFeeInfo(0);

      const tx = await this.ERC721Factory.createERC721(
        params.name,
        params.symbol,
        params.royaltyRecipient,
        params.royaltyBps,
        ethers.utils.formatBytes32String(ImplementationType.LAZY_MINT),

        { ...gasOverrides, ...params.overrides, value: platformFee }
      );
      const receipt = await tx.wait();

      const contractId = getArgumentFromEvent(
        receipt,
        this.ERC721Factory.interface,
        'Created',
        0
      );

      return new ERC721LazyMint(
        this.provider,
        this.appId,
        contractId,
        this.signer
      );
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async createToken(params: ERC20CreateParams): Promise<ERC20Base> {
    try {
      if (!this.signer) {
        throw new Error('Signer undefined');
      }

      await this.checkNetworksMatch();

      validateBigNumbers([params.supply]);

      const gasOverrides = await this.getGasPrice();

      const { platformFee } = await this.platformFeeInfo(0);

      const tx = await this.ERC20Factory.createERC20(
        params.name,
        params.symbol,
        18,
        params.supply,
        ethers.utils.formatBytes32String(ImplementationType.BASE),
        { ...gasOverrides, ...params.overrides, value: platformFee }
      );
      const receipt = await tx.wait();

      const contractId = getArgumentFromEvent(
        receipt,
        this.ERC20Factory.interface,
        'Created',
        0
      );

      return new ERC20Base(this.provider, this.appId, contractId, this.signer);
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }
}
