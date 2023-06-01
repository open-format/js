import { BigNumber, ethers, providers, Signer } from 'ethers';
import { Chains } from '../constants';
import { getPolygonGasFee } from '../helpers';
import { getSubgraphUrlFromChainID } from '../helpers/providers';

/**
 * Creates a new instance of the BaseContract which manages the provider and signer
 */
export class BaseContract {
  provider: providers.Provider;
  signer?: Signer | undefined;
  subgraphEndpoint?: string;
  appId: string;

  constructor(provider: providers.Provider, appId: string, signer?: Signer) {
    this.provider = provider;
    this.signer = signer;
    this.appId = appId;
  }

  async getSubgraphEndpoint() {
    const providerNetwork = await this.provider.getNetwork();
    this.subgraphEndpoint = getSubgraphUrlFromChainID(providerNetwork.chainId);

    return this.subgraphEndpoint;
  }

  /**
   * Throws an error if the current signer and provider's networks differ
   * @private
   */
  protected async checkNetworksMatch() {
    if (this.signer) {
      const signerNetwork = await this.signer.provider?.getNetwork();
      const providerNetwork = await this.provider.getNetwork();

      if (signerNetwork?.chainId !== providerNetwork.chainId) {
        throw new Error(`Chains don't match or not supported.`);
      }
    }
  }

  /**
   * getGasPrice function to fetch the appropriate gas parameters.
   *
   * This function checks if the network supports EIP-1559 and returns the appropriate
   * gas parameters for a transaction. If EIP-1559 is not supported, it uses the
   * standard gas price.
   *
   * @async
   * @returns {Promise<{ maxFeePerGas?: ethers.BigNumber, maxPriorityFeePerGas?: ethers.BigNumber, gasPrice?: ethers.BigNumber }>}
   * An object containing the necessary gas parameters for a transaction.
   *
   * @throws Will throw an error if the network provider is not available or there's an issue with fetching gas data.
   */
  protected async getGasPrice(): Promise<{
    maxFeePerGas?: ethers.BigNumber;
    maxPriorityFeePerGas?: ethers.BigNumber;
    gasPrice?: ethers.BigNumber;
  }> {
    const feeData = await this.provider.getFeeData();
    const isEIP559 = feeData.maxFeePerGas && feeData.maxPriorityFeePerGas;

    if (isEIP559) {
      // EIP-1559 is supported
      const chainId = (await this.provider.getNetwork()).chainId;
      let maxPriorityFeePerGas: BigNumber;

      if (
        chainId === Chains.polygon.id ||
        chainId === Chains.polygonMumbai.id
      ) {
        maxPriorityFeePerGas = await getPolygonGasFee(chainId);
      } else {
        maxPriorityFeePerGas = BigNumber.from(feeData.maxPriorityFeePerGas);
      }

      const block = await this.provider.getBlock('latest');
      const baseBlockFee =
        block && block.baseFeePerGas
          ? block.baseFeePerGas
          : ethers.utils.parseUnits('1', 'gwei');

      const baseMaxFeePerGas = baseBlockFee.mul(2);
      const maxFeePerGas = baseMaxFeePerGas.add(maxPriorityFeePerGas);
      return {
        maxFeePerGas,
        maxPriorityFeePerGas,
      };
    } else {
      // For non EIP-1559 networks, use the standard gas price
      const gasPrice = await this.provider.getGasPrice();

      return {
        gasPrice,
      };
    }
  }
}
