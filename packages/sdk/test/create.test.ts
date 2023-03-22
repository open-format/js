import {
  ERC20CreateParams,
  ERC721CreateParams,
  ImplementationType,
  OpenFormatSDK,
} from '../src';
import { APP_ID, PRIVATE_KEY } from './utilities';

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
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: walletAddress,
      royaltyBps: 1000,
      type: 'Base',
    };
    const contract = await sdk.ERC721.create(params);
    const totalSupply = await contract.totalSupply();

    expect(totalSupply.toString()).toBe('0');
  });

  it('throws an error if royaltyRecipient parameter is a not a BigNumber', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: 'InvalidRoyaltyRecipient',
      royaltyBps: 1000,
      type: 'Base',
    };

    async function create() {
      await sdk.ERC721.create(params);
    }

    await expect(create).rejects.toThrow('Invalid wallet or contract address');
  });

  it('throws an error if royaltyBps parameter is a not a BigNumber', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: walletAddress,
      royaltyBps: 'InvalidRoyaltyBps',
      type: 'Base',
    };

    async function create() {
      await sdk.ERC721.create(params);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if a signer is not passed', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: walletAddress,
      royaltyBps: 1000,
      type: 'Base',
    };

    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function create() {
      await sdk.ERC721.create(params);
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
    const params: ERC20CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      decimal: 18,
      supply: 1000,
      type: 'Base',
    };

    const contract = await sdk.ERC20.create(params);

    if (contract) {
      const balanceOf = await contract.balanceOf({ account: walletAddress });
      expect(balanceOf).toBe(1000);
    }
  });

  it('throws an error if decimals parameter is a not a BigNumber', async () => {
    const params: ERC20CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      decimal: 'InvalidDecimals',
      supply: 1000,
      type: ImplementationType.BASE,
    };

    async function create() {
      await sdk.ERC20.create(params);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if supply parameter is a not a BigNumber', async () => {
    const params: ERC20CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      decimal: 18,
      supply: 'InvalidSupply',
      type: ImplementationType.BASE,
    };

    async function create() {
      await sdk.ERC20.create(params);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if a signer is not passed', async () => {
    const params: ERC20CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      decimal: 18,
      supply: 1000,
      type: 'Base',
    };

    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function create() {
      await sdk.ERC20.create(params);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});
