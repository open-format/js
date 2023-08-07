import {
  ContractErrors,
  ERC20Base,
  ERC721Base,
  ERC721MintParams,
} from '../src';
import { toWei } from '../src/helpers';
import { WALLETS, ZERO_ADDRESS } from './utilities';

describe('NFT', () => {
  describe('approve()', () => {
    let contract: ERC721Base = global.NFT;
    let walletAddress: string;
    let ERC721MintParams: ERC721MintParams = {
      to: WALLETS[0],
      tokenURI: 'ipfs://',
    };

    it('approves another wallet to transfer a token', async () => {
      const tokenId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);
      await contract.approve({ spender: WALLETS[1], tokenId });
      const approved = await contract.getApproved({ tokenId });
      expect(approved.toString()).toBe(WALLETS[1]);
    });

    it('throws an error if token attempted to be transferred does not exist', async () => {
      const tokenId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      async function approve() {
        await contract.approve({
          spender: WALLETS[1],
          tokenId: tokenId.add(1),
        });
      }

      await expect(approve).rejects.toThrow(
        ContractErrors.OwnerQueryForNonexistentToken
      );
    });

    it('throws an error if token attempted to be approved is not owned by signer', async () => {
      const tokenId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);
      await contract.transfer({
        from: WALLETS[0],
        to: WALLETS[1],
        tokenId,
      });

      async function approve() {
        await contract.approve({ spender: WALLETS[1], tokenId });
      }

      await expect(approve).rejects.toThrow(
        ContractErrors.ApprovalCallerNotOwnerNorApproved
      );
    });
  });
});
describe('ERC20', () => {
  const AMOUNT = toWei('100');

  describe('approve()', () => {
    let contract: ERC20Base = global.Token;
    let walletAddress: string;

    beforeAll(async () => {
      await contract.mint({ to: WALLETS[0], amount: AMOUNT });
    });

    it('approves another wallet to transfer a token', async () => {
      await contract.approve({ spender: WALLETS[1], amount: AMOUNT });

      const approved = await contract.allowance({
        holder: WALLETS[0],
        spender: WALLETS[1],
      });

      expect(approved).toBe(AMOUNT.toString());
    });

    it('throws an error when to address is not a valid address', async () => {
      async function approve() {
        await contract.approve({ spender: 'INVALID', amount: AMOUNT });
      }

      await expect(approve).rejects.toThrow(
        'Error: Invalid wallet or contract address'
      );
    });

    it('throws an error when to address is a ZERO address', async () => {
      async function approve() {
        await contract.approve({ spender: ZERO_ADDRESS, amount: AMOUNT });
      }

      await expect(approve).rejects.toThrow(
        ContractErrors.ERC20Base__ApproveToZeroAddress
      );
    });
  });
});
