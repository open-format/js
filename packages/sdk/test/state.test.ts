import { BigNumber, ethers } from 'ethers';
import {
  ContractErrors,
  ERC20Base,
  ERC721Base,
  ERC721MintParams,
} from '../src';
import { toWei } from '../src/helpers';
import { WALLETS } from './utilities';

describe('ERC721', () => {
  describe('State', () => {
    let contract: ERC721Base = global.NFT;
    let ERC721MintParams: ERC721MintParams = {
      to: WALLETS[0],
      tokenURI: 'ipfs://',
    };

    describe('totalSupply()', () => {
      it('returns the total supply', async () => {
        const totalSupply = await contract.totalSupply();
        await contract.mint(ERC721MintParams);
        const newTotalSupply = await contract.totalSupply();
        expect(newTotalSupply).toBe(totalSupply + 1);
      });
    });
    describe('ownerOf()', () => {
      it('returns the owner of a given token', async () => {
        const tokenId = await contract.nextTokenIdToMint();
        await contract.mint(ERC721MintParams);
        const ownerOf = await contract.ownerOf({ tokenId });

        expect(ownerOf.toString()).toBe(WALLETS[0]);
      });

      it('throws an error if the attempted token to be checked does not exist', async () => {
        const tokenId = await contract.nextTokenIdToMint();
        await contract.mint(ERC721MintParams);

        async function ownerOf() {
          await contract.ownerOf({ tokenId: tokenId.add(1) });
        }

        await expect(ownerOf).rejects.toThrow(
          ContractErrors.OwnerQueryForNonexistentToken
        );
      });
    });
    describe('tokenURI()', () => {
      it('returns the tokenURI of a given token', async () => {
        const tokenId = await contract.nextTokenIdToMint();
        await contract.mint(ERC721MintParams);
        const tokenURI = await contract.tokenURI({ tokenId });

        expect(tokenURI).toBe('ipfs://');
      });

      it('throws an error if the attempted token to be checked does not exist', async () => {
        const tokenId = await contract.nextTokenIdToMint();
        await contract.mint(ERC721MintParams);

        async function tokenURI() {
          await contract.tokenURI({ tokenId: tokenId.add(1) });
        }

        await expect(tokenURI).rejects.toThrow(
          ContractErrors.BatchMintMetadata_invalidTokenId
        );
      });
    });
    describe('balanceOf()', () => {
      it('returns the amount of tokens owned by an account', async () => {
        const newWallet = ethers.Wallet.createRandom().address;
        await contract.mint({ to: newWallet, tokenURI: 'ipfs://' });
        const balanceOf = await contract.balanceOf({ owner: newWallet });

        expect(balanceOf).toBe(1);
      });

      it('throws an error if the attempted wallet to be checked is not valid', async () => {
        async function balanceOf() {
          await contract.balanceOf({ owner: '0x13fg4' });
        }

        await expect(balanceOf).rejects.toThrow(
          'Error: Invalid wallet or contract address'
        );
      });
    });
  });
});

describe('ERC20', () => {
  const AMOUNT = toWei('100');

  describe('State', () => {
    let contract: ERC20Base = global.Token;

    describe('totalSupply()', () => {
      it('returns the total supply', async () => {
        const totalSupply = await contract.totalSupply();
        await contract.mint({ to: WALLETS[0], amount: AMOUNT });
        const newTotalSupply = await contract.totalSupply();

        expect(newTotalSupply).toBe(
          BigNumber.from(totalSupply).add(AMOUNT).toString()
        );
      });
    });
    describe('balanceOf()', () => {
      it(`returns ${AMOUNT} after minting ${AMOUNT} token`, async () => {
        const balanceOf = await contract.balanceOf({
          account: WALLETS[1],
        });
        await contract.mint({ to: WALLETS[1], amount: AMOUNT });
        const newBalanceOf = await contract.balanceOf({
          account: WALLETS[1],
        });

        expect(newBalanceOf).toBe(
          BigNumber.from(balanceOf).add(AMOUNT).toString()
        );
      });

      it('throws an error if the attempted wallet to be checked is not valid', async () => {
        async function balanceOf() {
          await contract.balanceOf({ account: '0x13fg4' });
        }

        await expect(balanceOf).rejects.toThrow(
          'Error: Invalid wallet or contract address'
        );
      });
    });
    describe('allowance()', () => {
      it(`returns ${AMOUNT} as the allowance`, async () => {
        await contract.mint({ to: WALLETS[0], amount: AMOUNT });
        await contract.approve({ spender: WALLETS[1], amount: AMOUNT });

        const allowance = await contract.allowance({
          holder: WALLETS[0],
          spender: WALLETS[1],
        });

        expect(allowance).toBe(AMOUNT.toString());
      });

      it('throws an error if the attempted wallet to be checked is not valid', async () => {
        async function balanceOf() {
          await contract.balanceOf({ account: '0x13fg4' });
        }

        await expect(balanceOf).rejects.toThrow(
          'Error: Invalid wallet or contract address'
        );
      });
    });
  });
});
