import { BigNumber, ContractReceipt, ethers, providers, Signer } from 'ethers';
import {
  ERC721Base as ERC721BaseContract,
  ERC721Base__factory,
} from '../../../contract-types';
import {
  parseErrorData,
  processTransaction,
} from '../../../helpers/transaction';
import {
  validateWallet,
  validateWalletAndMetadata,
} from '../../../helpers/validation';
import {
  ContractType,
  ERC721ApproveParams,
  ERC721BalanceOfParams,
  ERC721BatchMintParams,
  ERC721BurnParams,
  ERC721GetApprovedParams,
  ERC721MintParams,
  ERC721OwnerOfParams,
  ERC721SetMinterRoleParams,
  ERC721TotalSupplyParams,
  ERC721TransferParams,
  Roles,
} from '../../../types';
import { App } from '../../app';
import { BaseContract } from '../../base';

/**
 * Represents an ERC721 contract instance with utility methods to interact with an ERC721 contract
 * @class ERC721
 * @extends BaseContract
 */

export class ERC721Base extends BaseContract {
  private contract: ERC721BaseContract;
  private app: App;

  constructor(
    provider: providers.Provider,
    appId: string,
    contractAddress: string,
    signer?: Signer
  ) {
    super(provider, appId, signer);

    if (contractAddress && ethers.utils.isAddress(contractAddress)) {
      this.contract = ERC721Base__factory.connect(
        contractAddress,
        signer || provider
      );

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

  async mint(params: ERC721MintParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      validateWalletAndMetadata(params.to, params.tokenURI);

      const { platformFee } = await this.app.platformFeeInfo(0);

      const tx = await this.contract.mintTo(params.to, params.tokenURI, {
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

  /**
   * Mint multiple tokens and transfer them to the specified address.
   * @async
   * @function batchMint
   * @param {string} params.to - The address to mint the tokens to.
   * @param {number} params.quantity - The number of tokens to mint.
   * @param {string} params.baseURI - The base URI of the token metadata.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} The transaction receipt.
   * @throws Will throw an error if the wallet or metadata are invalid or if an error occurs during the transaction.
   */

  async batchMint(params: ERC721BatchMintParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      validateWalletAndMetadata(params.to, params.baseURI);

      const tx = await this.contract.batchMintTo(
        params.to,
        params.quantity,
        params.baseURI,

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

  async transfer(params: ERC721TransferParams): Promise<ContractReceipt> {
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
