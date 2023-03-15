import { ethers } from 'ethers';
import { ERC20Instance, ERC721Instance, OpenFormatSDK } from '../src';
import {
  APP_ID,
  ERC20_CONTRACT_ADDRESS,
  ERC721_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  WALLET_ADDRESS2,
} from './utilities';

describe('ERC721', () => {
  describe('State', () => {
    let sdk: OpenFormatSDK;
    let contract: ERC721Instance;
    let walletAddress: string;

    beforeAll(async () => {
      sdk = new OpenFormatSDK({
        network: 'localhost',
        appId: APP_ID,
        signer: PRIVATE_KEY,
      });

      contract = (await sdk.getContract({
        contractAddress: ERC721_CONTRACT_ADDRESS,
      })) as ERC721Instance;

      if (sdk.signer) {
        walletAddress = await sdk.signer?.getAddress();
      }
    });
    describe('totalSupply()', () => {
      it('returns the total supply', async () => {
        const totalSupply = await contract.totalSupply();
        await contract.mint([walletAddress, 'ipfs://']);
        const newTotalSupply = await contract.totalSupply();
        expect(newTotalSupply).toBe(totalSupply + 1);
      });
    });
    describe('ownerOf()', () => {
      it('returns the owner of a given token', async () => {
        const tokenId = await contract.nextTokenIdToMint();
        await contract.mint([walletAddress, 'ipfs://']);
        const ownerOf = await contract.ownerOf([tokenId]);

        expect(ownerOf.toString()).toBe(walletAddress);
      });

      it('throws an error if the attempted token to be checked does not exist', async () => {
        const tokenId = await contract.nextTokenIdToMint();
        await contract.mint([walletAddress, 'ipfs://']);

        async function ownerOf() {
          await contract.ownerOf([tokenId.add(1)]);
        }

        await expect(ownerOf).rejects.toThrow('OwnerQueryForNonexistentToken');
      });
    });
    describe('balanceOf()', () => {
      it('returns the amount of tokens owned by an account', async () => {
        const newWallet = ethers.Wallet.createRandom().address;
        await contract.mint([newWallet, 'ipfs://']);
        const balanceOf = await contract.balanceOf([newWallet]);

        expect(balanceOf).toBe(1);
      });

      it('throws an error if the attempted wallet to be checked is not valid', async () => {
        async function balanceOf() {
          await contract.balanceOf(['0x13fg4']);
        }

        await expect(balanceOf).rejects.toThrow(
          'Error: Invalid wallet or contract address'
        );
      });
    });
  });
});

describe('ERC20', () => {
  const AMOUNT = 100;

  describe('State', () => {
    let sdk: OpenFormatSDK;
    let contract: ERC20Instance;
    let walletAddress: string;

    beforeAll(async () => {
      sdk = new OpenFormatSDK({
        network: 'localhost',
        appId: APP_ID,
        signer: PRIVATE_KEY,
      });

      contract = (await sdk.getContract({
        contractAddress: ERC20_CONTRACT_ADDRESS,
      })) as ERC20Instance;

      if (sdk.signer) {
        walletAddress = await sdk.signer?.getAddress();
      }
    });
    describe('totalSupply()', () => {
      it('returns the total supply', async () => {
        const totalSupply = await contract.totalSupply();
        await contract.mint([walletAddress, AMOUNT]);
        const newTotalSupply = await contract.totalSupply();
        expect(newTotalSupply).toBe(totalSupply + AMOUNT);
      });
    });
    describe('balanceOf()', () => {
      it(`returns ${AMOUNT} after minting ${AMOUNT} token`, async () => {
        const balanceOf = await contract.balanceOf([WALLET_ADDRESS2]);
        await contract.mint([WALLET_ADDRESS2, AMOUNT]);
        const newBalanceOf = await contract.balanceOf([WALLET_ADDRESS2]);

        expect(newBalanceOf).toBe(balanceOf + AMOUNT);
      });

      it('throws an error if the attempted wallet to be checked is not valid', async () => {
        async function balanceOf() {
          await contract.balanceOf(['0x13fg4']);
        }

        await expect(balanceOf).rejects.toThrow(
          'Error: Invalid wallet or contract address'
        );
      });
    });
    describe('allowance()', () => {
      it(`returns ${AMOUNT} as the allowance`, async () => {
        await contract.mint([walletAddress, AMOUNT]);
        await contract.approve([WALLET_ADDRESS2, AMOUNT]);

        const allowance = await contract.allowance([
          walletAddress,
          WALLET_ADDRESS2,
        ]);

        expect(allowance).toBe(AMOUNT);
      });

      it('throws an error if the attempted wallet to be checked is not valid', async () => {
        async function balanceOf() {
          await contract.balanceOf(['0x13fg4']);
        }

        await expect(balanceOf).rejects.toThrow(
          'Error: Invalid wallet or contract address'
        );
      });
    });
  });
});
