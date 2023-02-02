import { providers, Signer } from 'ethers';
import { BaseContract } from './base';
import { ERC20 } from './token/ERC20';
import { ERC721 } from './token/ERC721';

/**
 * Creates a new instances of the Open Format App class which allows you to interact all functionality.
 * @class
 * @public
 */
export class App extends BaseContract {
  address: string;

  constructor(address: string, provider: providers.Provider, signer?: Signer) {
    super(provider, address, signer);
    this.address = address;
    this.signer = signer;
  }

  getNFT(address: string) {
    if (!this.signer) return 'No signer found';
    // GO FIND ADDRESS IN SUBGRAPH
    return new ERC721(this.provider, address, this.signer);
  }

  getToken() {
    // GO FIND ADDRESS IN SUBGRAPH
    // const address = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
    const nft: ERC20 = new ERC20();
    return nft;
  }
}
