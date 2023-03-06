import { ethers } from 'ethers';
import { ERC721Instance, OpenFormatSDK } from '../src';
import { APP_ID, ERC721_CONTRACT_ADDRESS, PRIVATE_KEY } from './utilities';

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

    contract = await sdk.ERC721.getContract(ERC721_CONTRACT_ADDRESS);

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });
  describe('totalSupply()', () => {
    it('returns the total supply', async () => {
      const totalSupply = await contract.totalSupply();
      await contract.mint([walletAddress, 'ipfs://']);
      const newTotalSupply = await contract.totalSupply();
      expect(newTotalSupply.toNumber()).toBe(totalSupply.add(1).toNumber());
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

      expect(balanceOf.toNumber()).toBe(1);
    });

    it('throws an error if the attempted wallet to be checked is not valid', async () => {
      async function balanceOf() {
        await contract.balanceOf(['0x13fg4']);
      }

      await expect(balanceOf).rejects.toThrow('Invalid wallet address');
    });
  });
});
