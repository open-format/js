import {
  BigNumber,
  ContractReceipt,
  Overrides,
  providers,
  Signer,
} from 'ethers';
import { ERC721Base, ERC721Base__factory } from '../../contract-types';
import { processTransaction } from '../../helpers/transaction';
import { validateWalletAndMetadata } from '../../helpers/validation';
import { BaseContract } from '../base';

/**
 * ERC721 Instance
 * @public
 */

export class ERC721Instance extends BaseContract {
  private contract: ERC721Base;

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
    validateWalletAndMetadata(params[0].toString(), params[1].toString());

    const tx = await this.contract.mintTo(params[0], params[1], {
      ...transactionArgs,
    });

    const receipt = processTransaction(tx);
    return receipt;
  }

  /**
   * Batch mint ERC721 NFTs
   * @public
   * @description NFT batch minting functionality
   * @param {string[]} params wallet address, number of tokens to mint, metadataURL
   * @param {Overrides} [transactionArgs] optional transaction arguments
   * @example
   * ```javascript
   * const nft = await sdk.getContract("{{contract_address}}");
   * await nft.batchMint([walletAddress, 5, metadataURL]);
   * ```
   */

  async batchMint(
    params: Parameters<typeof this.contract.batchMintTo>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    validateWalletAndMetadata(params[0].toString(), params[2].toString());

    const tx = await this.contract.batchMintTo(
      params[0],
      params[1],
      params[2],
      {
        ...transactionArgs,
      }
    );

    const receipt = processTransaction(tx);
    return receipt;
  }

  async approve(
    params: Parameters<typeof this.contract.approve>,
    transactionArgs?: Overrides
  ): Promise<ContractReceipt> {
    const tx = await this.contract.approve(params[0], params[1], {
      ...transactionArgs,
    });

    const receipt = this.processTransaction(tx);
    return receipt;
  }

  async getApproved(
    params: Parameters<typeof this.contract.getApproved>,
    transactionArgs?: Overrides
  ): Promise<string> {
    const tx = await this.contract.getApproved(params[0], {
      ...transactionArgs,
    });

    return tx;
  }

  async totalSupply(transactionArgs?: Overrides): Promise<BigNumber> {
    const tx = await this.contract.totalSupply({
      ...transactionArgs,
    });

    return tx;
  }

  async balanceOf(
    params: Parameters<typeof this.contract.balanceOf>,
    transactionArgs?: Overrides
  ): Promise<BigNumber> {
    const tx = await this.contract.balanceOf(params[0], {
      ...transactionArgs,
    });

    return tx;
  }

  async ownerOf(
    params: Parameters<typeof this.contract.ownerOf>,
    transactionArgs?: Overrides
  ): Promise<string> {
    const tx = await this.contract.ownerOf(params[0], {
      ...transactionArgs,
    });

    return tx;
  }
}
