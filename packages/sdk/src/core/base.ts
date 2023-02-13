import { providers, Signer } from 'ethers';

/**
 * Creates a new instance of the BaseContract which manages the provider and signer
 */
export class BaseContract {
  provider: providers.Provider;
  signer?: Signer | undefined;
  appId: string;

  constructor(provider: providers.Provider, appId: string, signer?: Signer) {
    this.provider = provider;
    this.signer = signer;
    this.appId = appId;
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
