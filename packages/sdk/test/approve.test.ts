import {
  ERC20Instance,
  ERC721Instance,
  ERC721MintParams,
  OpenFormatSDK,
} from '../src';
import {
  APP_ID,
  ERC20_CONTRACT_ADDRESS,
  ERC721_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  WALLET_ADDRESS2,
  ZERO_ADDRESS,
} from './utilities';

describe('ERC721', () => {
  describe('approve()', () => {
    let sdk: OpenFormatSDK;
    let contract: ERC721Instance;
    let walletAddress: string;
    let ERC721MintParams: ERC721MintParams;

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
        ERC721MintParams = { to: walletAddress, tokenURI: 'ipfs://' };
      }
    });

    it('approves another wallet to transfer a token', async () => {
      const tokenId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);
      await contract.approve({ account: WALLET_ADDRESS2, tokenId });
      const approved = await contract.getApproved([tokenId]);
      expect(approved.toString()).toBe(WALLET_ADDRESS2);
    });

    it('throws an error if token attempted to be transferred does not exist', async () => {
      const tokenId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      async function approve() {
        await contract.approve({
          account: WALLET_ADDRESS2,
          tokenId: tokenId.add(1),
        });
      }

      await expect(approve).rejects.toThrow('OwnerQueryForNonexistentToken');
    });

    it('throws an error if token attempted to be approved is not owned by signer', async () => {
      const tokenId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);
      await contract.transfer({
        from: walletAddress,
        to: WALLET_ADDRESS2,
        tokenId,
      });

      async function approve() {
        await contract.approve({ account: WALLET_ADDRESS2, tokenId });
      }

      await expect(approve).rejects.toThrow(
        'ApprovalCallerNotOwnerNorApproved'
      );
    });
  });
});
describe('ERC20', () => {
  const AMOUNT = 100;

  describe('approve()', () => {
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
      await contract.mint([walletAddress, AMOUNT]);
    });

    it('approves another wallet to transfer a token', async () => {
      await contract.approve([WALLET_ADDRESS2, AMOUNT]);
      const approved = await contract.allowance([
        walletAddress,
        WALLET_ADDRESS2,
      ]);
      expect(approved).toBe(AMOUNT);
    });

    it('throws an error when to address is not a valid address', async () => {
      async function approve() {
        await contract.approve(['INVALID', AMOUNT]);
      }

      await expect(approve).rejects.toThrow(
        'Error: Invalid wallet or contract address'
      );
    });

    it('throws an error when to address is a ZERO address', async () => {
      async function approve() {
        await contract.approve([ZERO_ADDRESS, AMOUNT]);
      }

      await expect(approve).rejects.toThrow('ERC20Base__ApproveToZeroAddress');
    });
  });
});
