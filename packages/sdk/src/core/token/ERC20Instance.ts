import {
  BigNumber,
  ContractReceipt,
  ethers,
  Overrides,
  providers,
  Signer,
} from 'ethers';
import { ERC20Base, ERC20Base__factory } from '../../contract-types';
import { parseErrorData, processTransaction } from '../../helpers/transaction';
import { validateWalletAndMetadata } from '../../helpers/validation';
import { ContractType } from '../../types';
import { BaseContract } from '../base';

/**
 * ERC721 Instance
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
   * Mint ERC721 NFTs
   * @public
   * @description NFT minting functionality
   * @param {string[]} params wallet address and metadataURL
   * @param {Overrides} [transactionArgs] optional transaction arguments
   * @example
   * ```javascript
   * const nft = await sdk.getContract("{{contract_address}}");
   * await nft.mint([walletAddress, metadataURL]);
   * ```
   */

  async mint(
    params: Parameters<typeof this.contract.mintTo>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    validateWalletAndMetadata(params[0].toString());

    const tx = await this.contract.mintTo(params[0], params[1], {
      ...transactionArgs,
    });

    const receipt = await processTransaction(tx);
    return receipt;
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
      const tx = await this.contract.burn(params[0], {
        ...transactionArgs,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError.name);
    }
  }

  async transfer(
    params: Parameters<typeof this.contract.transferFrom>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    try {
      const tx = await this.contract.transferFrom(
        params[0],
        params[1],
        params[2],
        {
          ...transactionArgs,
        }
      );

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError.name);
    }
  }

  async approve(
    params: Parameters<typeof this.contract.approve>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    try {
      const tx = await this.contract.approve(params[0], params[1], {
        ...transactionArgs,
      });

      const receipt = await processTransaction(tx);

      return receipt;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError.name);
    }
  }

  async getApproved(
    params: Parameters<typeof this.contract.allowance>,
    transactionArgs?: Overrides
  ): Promise<BigNumber> {
    try {
      const tx = await this.contract.allowance(params[0], params[1], {
        ...transactionArgs,
      });

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError.name);
    }
  }

  async totalSupply(transactionArgs?: Overrides): Promise<BigNumber> {
    try {
      const tx = await this.contract.totalSupply({
        ...transactionArgs,
      });

      return tx;
    } catch (error: any) {
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError.name);
    }
  }

  async balanceOf(
    params: Parameters<typeof this.contract.balanceOf>,
    transactionArgs?: Overrides
  ): Promise<BigNumber> {
    try {
      const tx = await this.contract.balanceOf(params[0], {
        ...transactionArgs,
      });

      return tx;
    } catch (error: any) {
      //@TODO: Improve parseErrorData helper.
      const parsedError = parseErrorData(error, ContractType.ERC20);
      throw new Error(parsedError.reason);
    }
  }
}
