import { BigNumber, ContractReceipt, providers, Signer } from 'ethers';
import {
  ERC721LazyDropFacet as ERC721LazyDropFacetContract,
  ERC721LazyDropFacet__factory,
} from '../../contract-types';
import { ERC721LazyDropStorage } from '../../contract-types/facet/ERC721LazyDropFacet';

import { parseErrorData, processTransaction } from '../../helpers/transaction';

import {
  ERC721LazyDrop_ClaimParams,
  ERC721LazyDrop_GetClaimConditionParams,
  ERC721LazyDrop_RemoveClaimConditionParams,
  ERC721LazyDrop_SetClaimConditionParams,
  ERC721LazyDrop_VerifyClaimParams,
} from '../../types';
import { App } from '../app';
import { BaseContract } from '../base';

/**
 * A class representing a ERC721LazyDrop contract that extends the BaseContract class.
 *
 * @class
 * @extends BaseContract
 */

export class ERC721LazyDrop extends BaseContract {
  private contract: ERC721LazyDropFacetContract;
  private tokenContractAddress: string;
  private app: App;

  /**
   * Create a new instance of the App class.
   *
   * @constructor
   * @param {providers.Provider} provider - The provider used to communicate with the blockchain.
   * @param {string} contractAddress - The contract address of the ERC721LazyDrop contract.
   * @param {string} appId - The address of the App contract.
   * @param {Signer} [signer] - The signer used to sign transactions.
   */

  constructor(
    provider: providers.Provider,
    contractAddress: string,
    appId: string,
    signer?: Signer
  ) {
    super(provider, appId, signer);

    this.contract = ERC721LazyDropFacet__factory.connect(
      this.appId,
      signer || provider
    );

    this.app = new App(provider, this.appId, signer);

    this.tokenContractAddress = contractAddress;
  }

  /**
   * Sets the claim condition for the ERC721LazyDrop contract.
   *
   * @async
   * @function setClaimCondition
   * @param {ERC721LazyMint_SetClaimConditionParams} params - The parameters for setting the claim condition.
   * @returns {Promise<ContractReceipt>} - A promise that resolves to a contract receipt object.
   * @throws {Error} - Throws an error if there is a problem setting the claim condition.
   */

  async setClaimCondition(
    params: ERC721LazyDrop_SetClaimConditionParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const { platformFee } = await this.app.platformFeeInfo(0);

      const tx = await this.contract.ERC721LazyDrop_setClaimCondition(
        this.tokenContractAddress,
        params.condition,
        params.resetClaimEligibility,
        { ...params.overrides, value: platformFee }
      );

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Claims tokens from the ERC721LazyDrop contract.
   *
   * @async
   * @function
   * @param {ERC721LazyMint_ClaimParams} params - The parameters for claiming tokens.
   * @returns {Promise<ContractReceipt>} - A promise that resolves to a contract receipt object.
   * @throws {Error} - Throws an error if there is a problem claiming tokens.
   */

  async claim(params: ERC721LazyDrop_ClaimParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const { platformFee } = await this.app.platformFeeInfo(0);
      const { applicationFee } = await this.app.applicationFeeInfo(
        BigNumber.from(params.pricePerToken).mul(params.quantity as BigNumber)
      );

      const tx = await this.contract.ERC721LazyDrop_claim(
        this.tokenContractAddress,
        params.receiver,
        params.quantity,
        params.currency,
        params.pricePerToken,
        { ...params.overrides, value: platformFee.add(applicationFee) }
      );

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Verifies a claim for tokens from the ERC721LazyDrop contract.
   *
   * @async
   * @function
   * @param {ERC721LazyMint_VerifyClaimParams} params - The parameters for verifying a claim.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the claim is valid.
   * @throws {Error} - Throws an error if there is a problem verifying the claim.
   */

  async verifyClaim(
    params: ERC721LazyDrop_VerifyClaimParams
  ): Promise<boolean> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.ERC721LazyDrop_verifyClaim(
        this.tokenContractAddress,
        params.claimer,
        params.quantity,
        params.currency,
        params.pricePerToken,
        { ...params.overrides }
      );

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Removes the claim condition for the ERC721LazyDrop contract.
   *
   * @async
   * @function removeClaimCondition
   * @param {ERC721LazyMint_RemoveClaimConditionParams} [params] - The optional parameters for removing the claim condition.
   * @returns {Promise<ContractReceipt>} - A promise that resolves to a contract receipt object.
   * @throws {Error} - Throws an error if there is a problem removing the claim condition.
   */
  async removeClaimCondition(
    params?: ERC721LazyDrop_RemoveClaimConditionParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.ERC721LazyDrop_removeClaimCondition(
        this.tokenContractAddress,
        { ...params?.overrides }
      );

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Gets the claim condition for the ERC721LazyDrop contract.
   *
   * @async
   * @function getClaimCondition
   * @param {ERC721LazyMint_GetClaimConditionParams} [params] - The optional parameters for getting the claim condition.
   * @returns {Promise<ERC721LazyDropStorage.ClaimConditionStructOutput>} - A promise that resolves to the claim condition object.
   * @throws {Error} - Throws an error if there is a problem getting the claim condition.
   */

  async getClaimCondition(
    params?: ERC721LazyDrop_GetClaimConditionParams
  ): Promise<ERC721LazyDropStorage.ClaimConditionStructOutput> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.ERC721LazyDrop_getClaimCondition(
        this.tokenContractAddress,
        {
          ...params?.overrides,
        }
      );

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }
}
