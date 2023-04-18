import { ContractReceipt, ethers, providers, Signer } from 'ethers';
import {
  ERC20Base as ERC20BaseContract,
  ERC20Base__factory,
} from '../../../contract-types';
import {
  parseErrorData,
  processTransaction,
} from '../../../helpers/transaction';
import {
  validateBigNumber,
  validateWallet,
  validateWalletAndAmount,
  validateWallets,
} from '../../../helpers/validation';
import {
  ContractType,
  ERC20AllowanceParams,
  ERC20ApproveParams,
  ERC20BalanceOfParams,
  ERC20BurnParams,
  ERC20MintParams,
  ERC20TotalSupplyParams,
  ERC20TransferFromParams,
  ERC20TransferParams,
} from '../../../types';
import { BaseContract } from '../../base';

/**
 * Represents an ERC20 contract instance with utility methods to interact with an ERC20 contract
 *
 * @class ERC20
 * @extends BaseContract
 */

export class ERC20Base extends BaseContract {
  private contract: ERC20BaseContract;

  constructor(
    provider: providers.Provider,
    appId: string,
    contractAddress: string,
    signer?: Signer
  ) {
    super(provider, appId, signer);

    if (contractAddress && ethers.utils.isAddress(contractAddress)) {
      this.contract = ERC20Base__factory.connect(
        contractAddress,
        signer || provider
      );
    } else {
      throw new Error('Failed to get contract');
    }
  }

  /**
   * Mint new ERC20 tokens and sends them to a specified address.
   *
   * @async
   * @function mint
   * @param {string} params.to - The address to which the newly minted tokens will be sent.
   * @param {BigNumberish} params.amount - The amount of tokens to mint.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - The receipt of the transaction.
   * @throws Will throw an error if there was a problem processing the transaction, or if the parameters are invalid.
   */

  async mint(params: ERC20MintParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      validateWalletAndAmount(params.to, params.amount);

      const tx = await this.contract.mintTo(params.to, params.amount, {
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
   * Burns a specified amount of tokens from the account of the sender.
   *
   * @async
   * @function burn
   * @param {string} params.amount - The amount of tokens to be burned.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - A promise that resolves to the Ethereum transaction receipt object.
   * @throws {Error} - Throws an error if an error occurs while processing the transaction, with the corresponding error message.
   */

  async burn(params: ERC20BurnParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      validateBigNumber(params.amount);

      const tx = await this.contract.burn(params.amount, {
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
   * Transfers tokens from the current account to the provided account.
   *
   * @async
   * @function transfer
   * @param {string} params.to - The address of the account to receive the tokens.
   * @param {BigNumberish} params.amount - The amount of tokens to transfer.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - A Promise that resolves to the transaction receipt object.
   * @throws {Error} - If there is an error with the Ethereum transaction, a new Error object is thrown with a message containing the error details.
   */
  async transfer(params: ERC20TransferParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      validateWalletAndAmount(params.to, params.amount);

      const tx = await this.contract.transfer(params.to, params.amount, {
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
   * Transfers tokens from the current account to the provided account.
   *
   * @async
   * @function transfer
   * @param {string} params.to - The address of the account to receive the tokens.
   * @param {BigNumberish} params.amount - The amount of tokens to transfer.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} - A Promise that resolves to the transaction receipt object.
   * @throws {Error} - If there is an error with the Ethereum transaction, a new Error object is thrown with a message containing the error details.
   */
  async transferFrom(
    params: ERC20TransferFromParams
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      validateWalletAndAmount(params.to, params.amount);

      const tx = await this.contract.transferFrom(
        params.from,
        params.to,
        params.amount,
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
   * Approves a spender to spend a certain amount of tokens on behalf of the current account.
   *
   * @async
   * @function approve
   * @param {string} params.spender - The address of the account to approve for spending the tokens.
   * @param {BigNumberish} params.amount - The amount of tokens to approve for spending.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<ContractReceipt>} The transaction receipt.
   * @throws {Error} Throws an error if there was an issue with validating the wallet or the amount, or if there was an error processing the transaction.
   */

  async approve(params: ERC20ApproveParams): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      validateWalletAndAmount(params.spender, params.amount);

      const tx = await this.contract.approve(params.spender, params.amount, {
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
   * Returns the amount of token that the spender is allowed to withdraw from the holder's account.
   *
   * @async
   * @function allowance
   * @param {string} params.holder - The wallet address of the account holding the tokens
   * @param {string} params.spender - The wallet address of the account spending the tokens
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @throws {Error} Throws an error if there's an issue with the transaction
   * @returns {Promise<number>} Returns the allowance amount as a number
   */

  async allowance(params: ERC20AllowanceParams): Promise<number> {
    try {
      await this.checkNetworksMatch();
      validateWallets([params.holder, params.spender]);

      const allowance = await this.contract.allowance(
        params.holder,
        params.spender,
        {
          ...params.overrides,
        }
      );

      return allowance.toNumber();
    } catch (error: any) {
      const parsedError = parseErrorData(error);
      throw new Error(parsedError);
    }
  }

  /**
   * Returns the total supply of tokens.
   *
   * @async
   * @function totalSupply
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<number>} - The total supply of tokens as a number.
   * @throws {Error} - If the method call fails, an error is thrown with the relevant error message.
   */

  async totalSupply(params?: ERC20TotalSupplyParams): Promise<number> {
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
   * Gets the balance of the specified account.
   *
   * @async
   * @function balanceOf
   * @param {string} params.account - The account address for which the balance is retrieved.
   * @param {Overrides} [params.overrides] - Optional overrides for the contract call.
   * @returns {Promise<number>} A promise that resolves to the balance of the account as a number.
   * @throws {Error} Throws an error if the account address is invalid or the balanceOf call fails.
   */

  async balanceOf(params: ERC20BalanceOfParams): Promise<number> {
    try {
      await this.checkNetworksMatch();

      validateWallet(params.account);

      const balance = await this.contract.balanceOf(params.account, {
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
   * Get the contract address.
   *
   * @async
   * @function address
   */

  address(): string {
    return this.contract.address;
  }
}
