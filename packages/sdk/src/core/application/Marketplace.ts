export class Marketplace {
  address: string;
  /**
   * Creates a new instances of the OpenFormatNFT class which allows you to interact with a single deployed NFT
   * @class
   * @public
   */
  constructor(address: string) {
    this.address = address;
  }
  async createListing(id: Number, tokenAddress: string) {
    return `createListing() - ${id} - ${tokenAddress} - ${this.address}`;
  }

  async updateListing() {
    return 'updateListing()';
  }

  async cancelListing() {
    return 'cancelListing()';
  }

  async buyListing() {
    return 'buyListing()';
  }
}
