import { ethers, providers, Signer } from 'ethers';
import { ERC721Base } from '../../contract-types';
import { ERC721Base__factory } from '../../contract-types/factories/token/ERC721';
import { invariant } from '../../helpers/invariant';

import { BaseContract } from '../base';

export class ERC721 extends BaseContract {
  contract: ERC721Base | undefined;

  constructor(provider: providers.Provider, address: string, signer: Signer) {
    super(provider, signer);

    if (address && ethers.utils.isAddress(address)) {
      this.contract = ERC721Base__factory.connect(address, signer);
    } else {
      throw new Error('Invalid Address');
    }
  }

  async mint(to: string) {
    invariant(this.contract, 'Invalid contract');

    if (this.contract) {
      const tx = await this.contract.mintTo(to);
      const receipt = tx.wait();
      return receipt;
    }

    return;
  }

  async burn(tokenId: ethers.BigNumberish) {
    invariant(this.contract, 'Invalid contract');

    if (this.contract) {
      const tx = await this.contract.burn(tokenId);
      const receipt = tx.wait();
      return receipt;
    }

    return;
  }

  async ownerOf(tokenId: ethers.BigNumberish): Promise<string | undefined> {
    invariant(this.contract, 'Invalid contract');
    if (this.contract) {
      try {
        const owner = await this.contract.ownerOf(tokenId);
        return owner.toString();
      } catch (e) {
        return `Error: ${e}`;
      }
    }
    return;
  }

  async transfer(from: string, to: string, tokenId: ethers.BigNumberish) {
    invariant(this.contract, 'Invalid contract');
    if (this.contract) {
      try {
        const tx = await this.contract.transferFrom(from, to, tokenId);
        const receipt = tx.wait();
        return receipt;
      } catch (e) {
        return `Error: ${e}`;
      }
    }
    return;
  }

  async getAll() {
    return 'getAll()';
  }
}
