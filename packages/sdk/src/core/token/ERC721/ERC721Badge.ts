import {
  ethers,
  type BigNumber,
  type BigNumberish,
  type ContractReceipt,
  type providers,
  type Signer,
} from 'ethers';
import {
  ERC721Badge__factory,
  type ERC721Badge as ERC721BadgeContract,
} from '../../../contract-types';
import {
  parseErrorData,
  processTransaction,
} from '../../../helpers/transaction';
import { validateWallet } from '../../../helpers/validation';
import type {
  ERC721ApproveParams,
  ERC721BadgeMintParams,
  ERC721BalanceOfParams,
  ERC721BatchMintBadgeParams,
  ERC721BurnParams,
  ERC721GetApprovedParams,
  ERC721OwnerOfParams,
  ERC721SetApprovalForAllParams,
  ERC721SetMinterRoleParams,
  ERC721TokenURIParams,
  ERC721TotalSupplyParams,
  ERC721TransferParams,
} from '../../../types';
import { App } from '../../app';
import { BaseContract } from '../../base';

/**
 * Represents an ERC721 contract instance with utility methods to interact with an ERC721 contract
 * @class ERC721
 * @extends BaseContract
 */

export class ERC721Badge extends BaseContract {
  private contract: ERC721BadgeContract;
  private app: App;

  constructor(
    provider: providers.Provider,
    appId: string,
    contractAddress: string,
    signer?: Signer
  ) {
    super(provider, appId, signer);

    if (contractAddress && ethers.utils.isAddress(contractAddress)) {
      this.contract = ERC721Badge__factory.connect(
        contractAddress,
        signer || provider
      );

      this.app = new App(provider, appId, signer);
    } else {
      throw new Error('Failed to get contract');
    }
  }

  /**
   * Mint a new ERC721Badge token to the specified recipient address.
   * @async
   * @function mint
   * @param {string} params.to - The address of the recipient of the newly minted token.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - The transaction receipt object.
   * @throws {Error} - Throws an error if the recipient address is invalid or if the transaction fails.
   */

  async mint(params: ERC721BadgeMintParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      validateWallet(params.to);

      const gasOverrides = await this.getGasPrice();

      const { platformFee } = await this.app.platformFeeInfo(0);

      const tx = await this.contract.mintTo(params.to, {
        ...gasOverrides,
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

  /**
   * Mint multiple tokens and transfer them to the specified address.
   * @async
   * @function batchMint
   * @param {string} params.to - The address to mint the tokens to.
   * @param {number} params.quantity - The number of tokens to mint.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} The transaction receipt.
   * @throws Will throw an error if the wallet is invalid or if an error occurs during the transaction.
   */

  async batchMint(
    params: ERC721BatchMintBadgeParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      validateWallet(params.to);

      const gasOverrides = await this.getGasPrice();

      const { platformFee } = await this.app.platformFeeInfo(0);

      const tx = await this.contract.batchMintTo(params.to, params.quantity, {
        ...gasOverrides,
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

  async burn(params: ERC721BurnParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      const gasOverrides = await this.getGasPrice();

      const tx = await this.contract.burn(params.tokenId, {
        ...gasOverrides,
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

  async transfer(params: ERC721TransferParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      const gasOverrides = await this.getGasPrice();

      const tx = await this.contract.transferFrom(
        params.from,
        params.to,
        params.tokenId,
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
      const gasOverrides = await this.getGasPrice();

      const tx = await this.contract.approve(params.spender, params.tokenId, {
        ...gasOverrides,
        ...params.overrides,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  async setApprovalForAll(
    params: ERC721SetApprovalForAllParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      const gasOverrides = await this.getGasPrice();

      const tx = await this.contract.setApprovalForAll(
        params.operator,
        params.approved,
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
   *
   * Grants a give role to the specified account for the current ERC721 contract.
   * @async
   * @function grantRole
   * @param {BytesLike} params.role - The role to grant to the account.
   * @param {string} params.account - The account to be granted the given role.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - A Promise that resolves to a ContractReceipt object that contains information about the transaction.
   * @throws {Error} - Throws an error if the network check fails or if there is an error during the grantRole transaction.
   */

  async grantRole(params: ERC721SetMinterRoleParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      const gasOverrides = await this.getGasPrice();

      const tx = await this.contract.grantRole(params.role, params.account, {
        ...gasOverrides,
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
   * Returns the tokenURI of the specified NFT.
   * @async
   * @function tokenURI
   * @param {number} params.tokenId - The identifier of the NFT.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<string>} - The URI of the specified NFT.
   * @throws {Error} If there was an error executing the transaction, an Error object is thrown containing parsed error data.
   */
  async tokenURI(params: ERC721TokenURIParams): Promise<string> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.tokenURI(params.tokenId, {
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
