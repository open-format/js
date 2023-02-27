import { providers, Signer } from 'ethers';
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
        throw new Error(`Chains don't match`);
      }
    }
  }
}
