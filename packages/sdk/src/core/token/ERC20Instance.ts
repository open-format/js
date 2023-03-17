import { ContractReceipt, ethers, Overrides, providers, Signer } from 'ethers';
import { ERC20Base, ERC20Base__factory } from '../../contract-types';
import { parseErrorData, processTransaction } from '../../helpers/transaction';
import {
  validateWallet,
  validateWalletAndAmount,
  validateWallets,
} from '../../helpers/validation';
import { ContractType } from '../../types';
import { BaseContract } from '../base';

/**
 * ERC20 Instance
 * @public
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
   * Mint ERC20 Tokens
   * @public
   * @description Token minting functionality
   * @param {string[]} params wallet address and amount
   * @param {Overrides} [transactionArgs] optional transaction arguments
   * @example
   * ```javascript
   * const token = await sdk.getContract("{{contract_address}}");
   * await token.mint([walletAddress, amount]);
   * ```
   */

  async mint(
    params: Parameters<typeof this.contract.mintTo>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();
      validateWalletAndAmount(params[0].toString(), params[1]);

      const tx = await this.contract.mintTo(params[0], params[1], {
        ...transactionArgs,
      });

      const receipt = await processTransaction(tx);
      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);

      throw new Error(parsedError);
    }
  }

  /**
   * Burn an amount of token
   * @public
   */

  async burn(
    params: Parameters<typeof this.contract.burn>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.burn(params[0], {
        ...transactionArgs,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }

  //@TODO Transfer From
  async transfer(
    params: Parameters<typeof this.contract.transfer>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      const tx = await this.contract.transfer(params[0], params[1], {
        ...transactionArgs,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }

  async approve(
    params: Parameters<typeof this.contract.approve>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    try {
      await this.checkNetworksMatch();

      validateWalletAndAmount(params[0], params[1]);

      const tx = await this.contract.approve(params[0], params[1], {
        ...transactionArgs,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }

  async allowance(
    params: Parameters<typeof this.contract.allowance>,
    transactionArgs?: Overrides
  ): Promise<number> {
    try {
      await this.checkNetworksMatch();

      validateWallets([params[0], params[1]]);

      const allowance = await this.contract.allowance(params[0], params[1], {
        ...transactionArgs,
      });

      return allowance.toNumber();
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }

  async totalSupply(transactionArgs?: Overrides): Promise<number> {
    try {
      await this.checkNetworksMatch();

      const totalSupply = await this.contract.totalSupply({
        ...transactionArgs,
      });

      return totalSupply.toNumber();
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }

  //@TODO Should all BigNumbers and HexStrings be returned as numbers or strings?
  async balanceOf(
    params: Parameters<typeof this.contract.balanceOf>,
    transactionArgs?: Overrides
  ): Promise<number> {
    try {
      await this.checkNetworksMatch();

      validateWallet(params[0]);

      const balance = await this.contract.balanceOf(params[0], {
        ...transactionArgs,
      });

      return balance.toNumber();
    } catch (error: any) {
      //@TODO: Improve parseErrorData helper.
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError);
    }
  }
}
