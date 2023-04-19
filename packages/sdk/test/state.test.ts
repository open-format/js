import { BigNumber, ethers } from 'ethers';
import {
  Chains,
  ContractErrors,
  ERC20Base,
  ERC721Base,
  ERC721MintParams,
  OpenFormatSDK,
} from '../src';
import { toWei } from '../src/helpers';
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
    let contract: ERC721Base;
    let walletAddress: string;
    let ERC721MintParams: ERC721MintParams;

    beforeAll(async () => {
      sdk = new OpenFormatSDK({
        network: Chains.foundry,
        appId: APP_ID,
        signer: PRIVATE_KEY,
      });

      contract = (await sdk.getContract({
        contractAddress: ERC721_CONTRACT_ADDRESS,
      })) as ERC721Base;

      if (sdk.signer) {
        walletAddress = await sdk.signer?.getAddress();
        ERC721MintParams = { to: walletAddress, tokenURI: 'ipfs://' };
      }
    });
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

        expect(ownerOf.toString()).toBe(walletAddress);
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
    let sdk: OpenFormatSDK;
    let contract: ERC20Base;
    let walletAddress: string;

    beforeAll(async () => {
      sdk = new OpenFormatSDK({
        network: Chains.foundry,
        appId: APP_ID,
        signer: PRIVATE_KEY,
      });

      contract = (await sdk.getContract({
        contractAddress: ERC20_CONTRACT_ADDRESS,
      })) as ERC20Base;

      if (sdk.signer) {
        walletAddress = await sdk.signer?.getAddress();
      }
    });
    describe('totalSupply()', () => {
      it('returns the total supply', async () => {
        const totalSupply = await contract.totalSupply();
        await contract.mint({ to: walletAddress, amount: AMOUNT });
        const newTotalSupply = await contract.totalSupply();

        expect(newTotalSupply).toBe(
          BigNumber.from(totalSupply).add(AMOUNT).toString()
        );
      });
    });
    describe('balanceOf()', () => {
      it(`returns ${AMOUNT} after minting ${AMOUNT} token`, async () => {
        const balanceOf = await contract.balanceOf({
          account: WALLET_ADDRESS2,
        });
        await contract.mint({ to: WALLET_ADDRESS2, amount: AMOUNT });
        const newBalanceOf = await contract.balanceOf({
          account: WALLET_ADDRESS2,
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
        await contract.mint({ to: walletAddress, amount: AMOUNT });
        await contract.approve({ spender: WALLET_ADDRESS2, amount: AMOUNT });

        const allowance = await contract.allowance({
          holder: walletAddress,
          spender: WALLET_ADDRESS2,
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
