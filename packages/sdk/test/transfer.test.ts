import { BigNumber } from 'ethers';
import {
  ContractErrors,
  ERC20Base,
  ERC721Base,
  ERC721MintParams,
  ERC721TransferParams,
} from '../src';
import { toWei } from '../src/helpers';
import { WALLETS } from './utilities';

describe('ERC721', () => {
  describe('transfer()', () => {
    let contract: ERC721Base = global.NFT;

    let ERC721MintParams: ERC721MintParams = {
      to: WALLETS[0],
      tokenURI: 'ipfs://',
    };

    it('transfers a token', async () => {
      const nextId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      const params: ERC721TransferParams = {
        from: WALLETS[0],
        to: WALLETS[1],
        tokenId: nextId,
      };
      await contract.transfer(params);
      const ownerOf = await contract.ownerOf({ tokenId: nextId });
      expect(ownerOf.toString()).toBe(WALLETS[1]);
    });

    it('throws an error if non existent token is attempted to be transferred', async () => {
      const nextId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      const params: ERC721TransferParams = {
        from: WALLETS[0],
        to: WALLETS[1],
        tokenId: nextId.add(1),
      };

      async function transfer() {
        await contract.transfer(params);
      }

      await expect(transfer).rejects.toThrow(
        ContractErrors.OwnerQueryForNonexistentToken
      );
    });

    it('throws an error if token transferred is not owned by signer', async () => {
      const nextId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      const params: ERC721TransferParams = {
        from: WALLETS[0],
        to: WALLETS[1],
        tokenId: nextId,
      };

      await contract.transfer(params);

      async function transfer() {
        await contract.transfer(params);
      }

      await expect(transfer).rejects.toThrow(
        ContractErrors.TransferFromIncorrectOwner
      );
    });
  });
});

// @TODO Increase test coverage for ERC20 transfer
describe('ERC20', () => {
  const AMOUNT = toWei('1');

  describe('transfer()', () => {
    let contract: ERC20Base = global.Token;

    it('transfers a token', async () => {
      const receiverBalance = await contract.balanceOf({
        account: WALLETS[1],
      });

      await contract.transfer({ to: WALLETS[1], amount: AMOUNT });
      const newReceiverBalance = await contract.balanceOf({
        account: WALLETS[1],
      });

      expect(newReceiverBalance).toBe(
        BigNumber.from(receiverBalance).add(AMOUNT).toString()
      );
    });
  });
});
