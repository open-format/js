import {
  ContractErrors,
  ERC20Base,
  ERC721Base,
  ERC721MintParams,
} from '../src';
import { WALLETS } from './utilities';

describe('ERC721', () => {
  describe('burn()', () => {
    let contract: ERC721Base = global.NFT;
    let ERC721MintParams: ERC721MintParams;

    beforeAll(async () => {
      ERC721MintParams = { to: WALLETS[0], tokenURI: 'ipfs://' };
    });

    it('burns a token', async () => {
      const nextId = await contract.nextTokenIdToMint();

      await contract.mint(ERC721MintParams);
      const tx = await contract.burn({ tokenId: nextId });
      expect(tx.status).toBe(1);
    });

    it('throws an error if non existent token is passed', async () => {
      const nextId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      async function burn() {
        await contract.burn({ tokenId: nextId.add(1) });
      }

      await expect(burn).rejects.toThrow(
        ContractErrors.OwnerQueryForNonexistentToken
      );
    });
  });
});
describe('ERC20', () => {
  describe('burn()', () => {
    let contract: ERC20Base = global.Token;

    it('burns a token', async () => {
      await contract.mint({ to: WALLETS[0], amount: 1 });
      const tx = await contract.burn({ amount: 1 });
      expect(tx.status).toBe(1);
    });

    it('throws an error if non existent token is passed', async () => {
      await contract.mint({ to: WALLETS[0], amount: 1 });
      const walletBalance = await contract.balanceOf({
        account: WALLETS[0],
      });

      async function burn() {
        await contract.burn({ amount: walletBalance + 1 });
      }

      //@TODO update error when errors in contract are updated
      await expect(burn).rejects.toThrow(
        ContractErrors.ERC20Base_insufficientBalance
      );
    });
  });
});
