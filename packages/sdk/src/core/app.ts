import { ContractReceipt, ethers, providers, Signer } from 'ethers';
import {
  ERC20FactoryFacet as ERC20FactoryContract,
  ERC20FactoryFacet__factory,
  ERC721FactoryFacet as ERC721FactoryContract,
  ERC721FactoryFacet__factory,
  ERC721LazyDropFacet as ERC721LazyDropFacetContract,
  ERC721LazyDropFacet__factory,
  SettingsFacet as SettingsContract,
  SettingsFacet__factory,
} from '../contract-types';
import { poll } from '../helpers/subgraph';
import { parseErrorData, processTransaction } from '../helpers/transaction';
import {
  validateBigNumber,
  validateBigNumbers,
  validateWallet,
} from '../helpers/validation';
import {
  AppHasCreatorAccessParams,
  AppSetAcceptedCurrenciesParams,
  AppSetCreatorAccessParams,
  ContractResponse,
  ContractType,
  ERC20CreateParams,
  ERC721CreateParams,
  ImplementationType,
} from '../types';
import { BaseContract } from './base';
import { Subgraph } from './subgraph';
import { ERC20Base } from './token/ERC20/ERC20Base';
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

      const tx = await this.settings.setCreatorAccess(
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

      const tx = await this.settings.hasCreatorAccess(params.account, {
        ...params.overrides,
      });

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.Settings);
      throw new Error(parsedError);
    }
  }

  async setAcceptedCurrencies(
    params: AppSetAcceptedCurrenciesParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.settings.setAcceptedCurrencies(
        params.currencies,
        params.approvals,
        {
          ...params.overrides,
        }
      );

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.Settings);
      throw new Error(parsedError);
    }
  }

  async createNFT(params: ERC721CreateParams): Promise<ERC721Base> {
    if (!this.signer) {
      throw new Error('Signer undefined');
    }

    await this.checkNetworksMatch();

    validateWallet(params.royaltyRecipient);
    validateBigNumber(params.royaltyBps);

    const tx = await this.ERC721Factory.createERC721(
      params.name,
      params.symbol,
      params.royaltyRecipient,
      params.royaltyBps,
      ethers.utils.formatBytes32String(ImplementationType.BASE),
      { ...params.overrides }
    );
    const receipt = await tx.wait();
    const txTimestamp = (await this.provider.getBlock(receipt.blockNumber))
      .timestamp;

    const subgraphCall = async () =>
      await this.subgraph.getContractByTimestamp({
        appId: this.appId.toString(),
        createdAt: txTimestamp.toString(),
        type: ContractType.NFT,
      });

    const validate = (response: ContractResponse) =>
      !!response.contracts.length;

    return await poll({
      fn: subgraphCall,
      validate,
      interval: 1000,
      maxAttempts: 20,
    }).then(
      (response) =>
        new ERC721Base(
          this.provider,
          this.appId,
          (response as ContractResponse).contracts[0].id,
          this.signer
        )
    );
  }

  async createNFTDrop(params: ERC721CreateParams): Promise<ERC721LazyMint> {
    if (!this.signer) {
      throw new Error('Signer undefined');
    }

    await this.checkNetworksMatch();

    validateWallet(params.royaltyRecipient);
    validateBigNumber(params.royaltyBps);

    const tx = await this.ERC721Factory.createERC721(
      params.name,
      params.symbol,
      params.royaltyRecipient,
      params.royaltyBps,
      ethers.utils.formatBytes32String(ImplementationType.LAZY_MINT),

      { ...params.overrides }
    );
    const receipt = await tx.wait();
    const txTimestamp = (await this.provider.getBlock(receipt.blockNumber))
      .timestamp;

    const subgraphCall = async () =>
      await this.subgraph.getContractByTimestamp({
        appId: this.appId.toString(),
        createdAt: txTimestamp.toString(),
        type: ContractType.NFTLazyMint,
      });

    const validate = (response: ContractResponse) =>
      !!response.contracts.length;

    return await poll({
      fn: subgraphCall,
      validate,
      interval: 1000,
      maxAttempts: 20,
    }).then(
      (response) =>
        new ERC721LazyMint(
          this.provider,
          this.appId,
          (response as ContractResponse).contracts[0].id,
          this.signer
        )
    );
  }

  async createToken(params: ERC20CreateParams): Promise<ERC20Base> {
    if (!this.signer) {
      throw new Error('Signer undefined');
    }

    await this.checkNetworksMatch();

    validateBigNumbers([params.decimal, params.supply]);

    const tx = await this.ERC20Factory.createERC20(
      params.name,
      params.symbol,
      params.decimal,
      params.supply,
      ethers.utils.formatBytes32String(ImplementationType.BASE),
      { ...params.overrides }
    );
    const receipt = await tx.wait();
    const txTimestamp = (await this.provider.getBlock(receipt.blockNumber))
      .timestamp;

    const subgraphCall = async () =>
      await this.subgraph.getContractByTimestamp({
        appId: this.appId.toString(),
        createdAt: txTimestamp.toString(),
        type: ContractType.Token,
      });

    const validate = (response: ContractResponse) =>
      !!response.contracts.length;

    return await poll({
      fn: subgraphCall,
      validate,
      interval: 1000,
      maxAttempts: 20,
    }).then(
      (response) =>
        new ERC20Base(
          this.provider,
          this.appId,
          (response as ContractResponse).contracts[0].id,
          this.signer
        )
    );
  }
}
