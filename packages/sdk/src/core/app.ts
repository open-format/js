import { providers, Signer } from 'ethers';
import { Loyalty } from './application/Loyalty';
import { Marketplace } from './application/Marketplace';
import { Tickets } from './application/Tickets';
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
  ERC20: ERC20;
  ERC721: ERC721;
  Marketplace: Marketplace;
  Loyalty: Loyalty;
  Tickets: Tickets;

  constructor(address: string, provider: providers.Provider, signer?: Signer) {
    super(provider, signer);
    this.address = address;
    this.signer = signer;
    this.ERC20 = new ERC20();
    this.ERC721 = new ERC721();
    this.Marketplace = new Marketplace(address);
    this.Loyalty = new Loyalty();
    this.Tickets = new Tickets();
  }
}
