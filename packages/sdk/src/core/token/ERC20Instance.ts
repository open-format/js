import { ContractReceipt, ethers, providers, Signer } from 'ethers';
import { ERC20Base, ERC20Base__factory } from '../../contract-types';
import { parseErrorData, processTransaction } from '../../helpers/transaction';
import {
  validateWallet,
  validateWalletAndAmount,
  validateWallets,
} from '../../helpers/validation';
import {
  ContractType,
  ERC20AllowanceParams,
  ERC20ApproveParams,
  ERC20BalanceOfParams,
  ERC20BurnParams,
  ERC20MintParams,
  ERC20TotalSupplyParams,
  ERC20TransferParams,
} from '../../types';
import { BaseContract } from '../base';

/**
 * Represents an ERC20 contract instance with utility methods to interact with an ERC20 contract
 *
 * @class ERC20
 * @extends BaseContract
 */

export class ERC20Instance extends BaseContract {
  private contract: ERC20Base;

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
   * @param {ContractTransactionRequest} [params.overrides] - Optional overrides to use for the transaction.
   * @returns {Promise<ContractReceipt>} - The receipt of the transaction.
   * @throws Will throw an error if there was a problem processing the transaction, or if the parameters are invalid.
   */

  async mint(params: ERC20MintParams): Promise<ContractReceipt> {
    try {
      validateWalletAndAmount(params.to, params.amount);

      const tx = await this.contract.mintTo(params.to, params.amount, {
        ...params.overrides,
      });

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);

      throw new Error(parsedError);
    }
  }

  /**
   * Burns a specified amount of tokens from the account of the sender.
   *
   * @async
   * @function burn
   * @param {string} params.amount - The amount of tokens to be burned.
   * @param {Object} [params.overrides] - Override optional parameters (e.g. gasPrice, gasLimit) for the Ethereum transaction.
   * @returns {Promise<ContractReceipt>} - A promise that resolves to the Ethereum transaction receipt object.
   * @throws {Error} - Throws an error if an error occurs while processing the transaction, with the corresponding error message.
   */

  async burn(params: ERC20BurnParams): Promise<ContractReceipt> {
    try {
      const tx = await this.contract.burn(params.amount, {
        ...params.overrides,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
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
   * @param {Overrides} [params.overrides] - Override options for the Ethereum transaction.
   * @returns {Promise<ContractReceipt>} - A Promise that resolves to the transaction receipt object.
   * @throws {Error} - If there is an error with the Ethereum transaction, a new Error object is thrown with a message containing the error details.
   */
  async transfer(params: ERC20TransferParams): Promise<ContractReceipt> {
    try {
      const tx = await this.contract.transfer(params.to, params.amount, {
        ...params.overrides,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }

  /**
   * Approves a spender to spend a certain amount of tokens on behalf of the current account.
   *
   * @async
   * @function
   * @param {string} params.spender - The address of the account to approve for spending the tokens.
   * @param {BigNumberish} params.amount - The amount of tokens to approve for spending.
   * @param {Overrides} [params.overrides] - The transaction overrides.
   * @returns {Promise<ContractReceipt>} The transaction receipt.
   * @throws {Error} Throws an error if there was an issue with validating the wallet or the amount, or if there was an error processing the transaction.
   */

  async approve(params: ERC20ApproveParams): Promise<ContractReceipt> {
    try {
      validateWalletAndAmount(params.spender, params.amount);

      const tx = await this.contract.approve(params.spender, params.amount, {
        ...params.overrides,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
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
   * @param {ContractCallOverrides} [params.overrides] - The overrides for the Ethereum transaction
   * @throws {Error} Throws an error if there's an issue with the transaction
   * @returns {Promise<number>} Returns the allowance amount as a number
   */

  async allowance(params: ERC20AllowanceParams): Promise<number> {
    try {
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
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }

  async totalSupply(params?: ERC20TotalSupplyParams): Promise<number> {
    try {
      const totalSupply = await this.contract.totalSupply({
        ...params?.overrides,
      });

      return totalSupply.toNumber();
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }

  async balanceOf(params: ERC20BalanceOfParams): Promise<number> {
    try {
      validateWallet(params.account);

      const balance = await this.contract.balanceOf(params.account, {
        ...params.overrides,
      });

      return balance.toNumber();
    } catch (error: any) {
      //@TODO: Improve parseErrorData helper.
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }
}
