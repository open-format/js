import { OpenFormatSDK } from '../src';
import { APP_ID, generateRandomString, PRIVATE_KEY } from './utilities';

describe('ERC721', () => {
  let sdk: OpenFormatSDK;
  let walletAddress: string;

  beforeAll(async () => {
    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
      signer: PRIVATE_KEY,
    });

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });

  it('creates an ERC721 contract and returns an instance of it', async () => {
    const contract = await sdk.ERC721.create([
      generateRandomString(5),
      'NFT',
      walletAddress,
      1000,
    ]);

    if (contract) {
      const ownerOf = await contract.owner();
      expect(ownerOf.toString()).toBe(walletAddress);
    }
  });

  it('throws an error if royaltyRecipient parameter is a not a BigNumber', async () => {
    async function create() {
      await sdk.ERC721.create([
        generateRandomString(5),
        'NFT',
        'InvalidRoyaltyRecipient',
        1000,
      ]);
    }

    await expect(create).rejects.toThrow('Invalid wallet or contract address');
  });

  it('throws an error if royaltyBps parameter is a not a BigNumber', async () => {
    async function create() {
      await sdk.ERC721.create([
        generateRandomString(5),
        'NFT',
        walletAddress,
        'InvalidRoyaltyBps',
      ]);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if a signer is not passed', async () => {
    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function create() {
      await sdk.ERC721.create([
        generateRandomString(5),
        'NFT',
        walletAddress,
        1000,
      ]);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});
describe('ERC20', () => {
  let sdk: OpenFormatSDK;
  let walletAddress: string;

  beforeAll(async () => {
    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
      signer: PRIVATE_KEY,
    });

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });

  it('creates an ERC20 contract and returns an instance of it', async () => {
    const contract = await sdk.ERC20.create([
      generateRandomString(5),
      'NFT',
      18,
      1000,
    ]);

    if (contract) {
      const balanceOf = await contract.balanceOf([walletAddress]);
      expect(balanceOf).toBe(1000);
    }
  });

  it('throws an error if decimals parameter is a not a BigNumber', async () => {
    async function create() {
      await sdk.ERC20.create([
        generateRandomString(5),
        'NFT',
        'InvalidDecimals',
        1000,
      ]);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if supply parameter is a not a BigNumber', async () => {
    async function create() {
      await sdk.ERC20.create([
        generateRandomString(5),
        'NFT',
        18,
        'InvalidSupply',
      ]);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if a signer is not passed', async () => {
    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function create() {
      await sdk.ERC20.create([generateRandomString(5), 'NFT', 18, 1000]);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});
