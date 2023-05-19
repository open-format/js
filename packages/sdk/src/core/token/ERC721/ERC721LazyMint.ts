import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ethers,
  providers,
  Signer,
} from 'ethers';
import {
  ERC721LazyMint as ERC721LazyMintContract,
  ERC721LazyMint__factory,
} from '../../../contract-types';
import { ERC721LazyDropStorage } from '../../../contract-types/facet/ERC721LazyDropFacet';
import {
  parseErrorData,
  processTransaction,
} from '../../../helpers/transaction';
import {
  validateWallet,
  validateWalletAndAmount,
} from '../../../helpers/validation';
import {
  ERC721ApproveParams,
  ERC721BalanceOfParams,
  ERC721GetApprovedParams,
  ERC721LazyMint_BatchMintParams,
  ERC721LazyMint_BurnParams,
  ERC721LazyMint_ClaimParams,
  ERC721LazyMint_GetClaimConditionParams,
  ERC721LazyMint_LazyMintParams,
  ERC721LazyMint_MintParams,
  ERC721LazyMint_RemoveClaimConditionParams,
  ERC721LazyMint_SetClaimConditionParams,
  ERC721LazyMint_SetMinterRoleParams,
  ERC721LazyMint_TransferParams,
  ERC721LazyMint_VerifyClaimParams,
  ERC721OwnerOfParams,
  ERC721TotalSupplyParams,
} from '../../../types';
import { App } from '../../app';
import { BaseContract } from '../../base';
import { ERC721LazyDrop } from '../../drop/ERC721LazyDrop';

/**
 * Represents an ERC721 contract instance with utility methods to interact with an ERC721 contract
 * @class ERC721
 * @extends BaseContract
 */

export class ERC721LazyMint extends BaseContract {
  private contract: ERC721LazyMintContract;
  private drop: ERC721LazyDrop;
  private app: App;

  constructor(
    provider: providers.Provider,
    appId: string,
    contractAddress: string,
    signer?: Signer
  ) {
    super(provider, appId, signer);

    if (contractAddress && ethers.utils.isAddress(contractAddress)) {
      this.contract = ERC721LazyMint__factory.connect(
        contractAddress,
        signer || provider
      );

      this.drop = new ERC721LazyDrop(provider, contractAddress, appId, signer);
      this.app = new App(provider, appId, signer);
    } else {
      throw new Error('Failed to get contract');
    }
  }

  /**
   * Mint a new ERC721 token with the given tokenURI to the specified recipient address.
   * @async
   * @function mint
   * @param {string} params.to - The address of the recipient of the newly minted token.
   * @param {string} params.tokenURI - The URI of the token's metadata.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - The transaction receipt object.
   * @throws {Error} - Throws an error if the recipient address or tokenURI is invalid or if the transaction fails.
   */

  async mint(params: ERC721LazyMint_MintParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      validateWallet(params.to);

      const { platformFee } = await this.app.platformFeeInfo(0);

      const tx = await this.contract.mintTo(params.to, {
        ...params.overrides,
        value: platformFee,
      });

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async lazyMint(
    params: ERC721LazyMint_LazyMintParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const { platformFee } = await this.app.platformFeeInfo(0);

      const tx = await this.contract.lazyMint(
        params.amount,
        params.baseURIForTokens,
        ethers.utils.formatBytes32String(params.data as string),
        {
          ...params.overrides,
          value: platformFee,
        }
      );

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Mint multiple tokens and transfer them to the specified address.
   * @async
   * @function batchMint
   * @param {string} params.to - The array of address to mint the tokens to.
   * @param {number} params.quantity - The number of tokens to mint.
   * @param {string} params.baseURI - The base URI of the token metadata.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} The transaction receipt.
   * @throws Will throw an error if the wallet or metadata are invalid or if an error occurs during the transaction.
   */

  async batchMint(
    params: ERC721LazyMint_BatchMintParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      validateWalletAndAmount(params.to, params.quantity);

      const { platformFee } = await this.app.platformFeeInfo(0);

      const tx = await this.contract.batchMintTo(params.to, params.quantity, {
        ...params.overrides,
        value: platformFee.mul(params.quantity as BigNumberish),
      });

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Burns an ERC721 token with the specified token ID.
   * @async
   * @function burn
   * @param {number} params.tokenId - The ID of the token to burn.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - The transaction receipt for the burn operation.
   * @throws {Error} - Throws an error if the burn operation fails.
   */

  async burn(params: ERC721LazyMint_BurnParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.burn(params.tokenId, {
        ...params.overrides,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Transfers ownership of an ERC721 token from one address to another.
   * @async
   * @function transfer
   * @param {string} params.from - The address of the current token owner.
   * @param {string} params.to - The address of the new token owner.
   * @param {number} params.tokenId - The ID of the token to transfer.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - The transaction receipt for the transfer operation.
   * @throws {Error} - Throws an error if the transfer operation fails.
   */

  async transfer(
    params: ERC721LazyMint_TransferParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.transferFrom(
        params.from,
        params.to,
        params.tokenId,
        {
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

  /**
   *
   * Grants the MINTER_ROLE to the specified account for the current ERC721 contract.
   * @async
   * @function setMinterRole
   * @param {BytesLike} params.role - The role to grant to the account.
   * @param {string} params.account - The account to be granted the MINTER_ROLE.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - A Promise that resolves to a ContractReceipt object that contains information about the transaction.
   * @throws {Error} - Throws an error if the network check fails or if there is an error during the grantRole transaction.
   */

  async grantRole(
    params: ERC721LazyMint_SetMinterRoleParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.grantRole(params.role, params.account, {
        ...params.overrides,
      });

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async setClaimConditions(
    params: ERC721LazyMint_SetClaimConditionParams
  ): Promise<ContractReceipt> {
    return await this.drop.setClaimCondition(params);
  }

  /**
   * Removes the claim condition for the ERC721LazyDrop contract.
   *
   * @async
   * @function removeClaimCondition
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - A promise that resolves to a contract receipt object.
   * @throws {Error} - Throws an error if there is a problem removing the claim condition.
   */

  async removeClaimCondition(
    params?: ERC721LazyMint_RemoveClaimConditionParams
  ): Promise<ContractReceipt> {
    return await this.drop.removeClaimCondition(params);
  }

  /**
   * Gets the claim condition.
   *
   * @async
   * @function getClaimCondition
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ERC721LazyDropStorage.ClaimConditionStructOutput>} - A promise that resolves to the claim condition object.
   * @throws {Error} - Throws an error if there is a problem getting the claim condition.
   */

  async getClaimCondition(
    params?: ERC721LazyMint_GetClaimConditionParams
  ): Promise<ERC721LazyDropStorage.ClaimConditionStructOutput> {
    return await this.drop.getClaimCondition(params);
  }

  /**
   * Claims NFT tokens.
   *
   * @async
   * @function claim
   * @param {string} params.receiver - The address that will receive the claimed NFT tokens.
   * @param {number} params.quantity - The number of NFT tokens to claim.
   * @param {string} params.currency - The contract address of the currency used to pay for the NFT tokens (e.g. 'ETH', 'DAI').
   * @param {number} params.pricePerToken - The price per token in wei of the NFT tokens.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} The transaction receipt.
   * @throws {Error} - Throws an error if there is a problem claiming the tokens.
   */

  async claim(params: ERC721LazyMint_ClaimParams): Promise<ContractReceipt> {
    return await this.drop.claim(params);
  }

  /**
   * Verifies a claim.
   *
   * @async
   * @function
   * @param {address} params.claimer - The address of the account that will claim the tokens.
   * @param {number} params.quantity - The number of tokens to be claimed.
   * @param {address} params.currency - The address of the token used to purchase the NFTs.
   * @param {BigNumber} params.pricePerToken - The price per token, denominated in the currency token.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<boolean>} - A Promise that resolves with a boolean indicating whether the claim can be made.
   * @throws {Error} - Throws an error if there is a problem verifying the claim.
   */

  async verifyClaim(
    params: ERC721LazyMint_VerifyClaimParams
  ): Promise<boolean> {
    return await this.drop.verifyClaim(params);
  }
  /**
   * Grants approval to another address to transfer ownership of an ERC721 token.
   * @async
   * @function approve
   * @param {string} params.spender - The address of the account to grant approval to.
   * @param {number} params.tokenId - The ID of the token to grant approval for.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - The transaction receipt for the approval operation.
   * @throws {Error} - Throws an error if the approval operation fails.
   */

  async approve(params: ERC721ApproveParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.approve(params.spender, params.tokenId, {
        ...params.overrides,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Retrieves the account approved to transfer the ownership of a specific token ID.
   * @async
   * @function getApproved
   * @param {number} params.tokenId - The token ID for which to retrieve the approved account.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<string>} - A Promise that resolves to the approved account address.
   * @throws {Error} - Throws an error if there was an issue retrieving the approved account.
   */

  async getApproved(params: ERC721GetApprovedParams): Promise<string> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.getApproved(params.tokenId, {
        ...params.overrides,
      });

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Returns the total supply of tokens in the ERC721 contract
   * @async
   * @function totalSupply
   * @param {ERC721TotalSupplyParams} [params] - Optional parameters for the transaction
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<number>} - The total number of tokens in the contract
   * @throws {Error} If there was an error retrieving the total supply
   */

  async totalSupply(params?: ERC721TotalSupplyParams): Promise<number> {
    try {
      await this.checkNetworksMatch();

      const totalSupply = await this.contract.totalSupply({
        ...params?.overrides,
      });

      return totalSupply.toNumber();
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Gets the number of tokens owned by a specific account.
   * @async
   * @function balanceOf
   * @param {string} params.owner - The address to query the balance of.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<number>} A promise that resolves to the number of tokens owned by the specified account.
   * @throws {Error} If there was an error executing the balanceOf function.
   */

  async balanceOf(params: ERC721BalanceOfParams): Promise<number> {
    try {
      await this.checkNetworksMatch();

      validateWallet(params.owner);
      const balance = await this.contract.balanceOf(params.owner, {
        ...params.overrides,
      });

      return balance.toNumber();
    } catch (error: any) {
      //@TODO: Improve parseErrorData helper.
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Returns the owner of the specified NFT.
   * @async
   * @function ownerOf
   * @param {number} params.tokenId - The identifier of the NFT.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<string>} - The address of the owner of the specified NFT.
   * @throws {Error} If there was an error executing the transaction.
   */

  async ownerOf(params: ERC721OwnerOfParams): Promise<string> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.ownerOf(params.tokenId, {
        ...params.overrides,
      });

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Get the contract address.
   *
   * @async
   * @function address
   */

  address(): string {
    return this.contract.address;
  }

  /**
   * Get the next token ID to be minted.
   * @returns {Promise<BigNumber>} The next token ID.
   */

  async nextTokenIdToMint(): Promise<BigNumber> {
    return await this.contract.nextTokenIdToMint();
  }
}
