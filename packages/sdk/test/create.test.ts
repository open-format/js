import { ERC20CreateParams, ERC721CreateParams, OpenFormatSDK } from '../src';
import { APP_ID, PRIVATE_KEY } from './utilities';

describe('NFT', () => {
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

  it('creates an NFT contract and returns an instance of it', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: walletAddress,
      royaltyBps: 1000,
    };

    const contract = await sdk.App.createNFT(params);
    const totalSupply = await contract.totalSupply();

    expect(totalSupply.toString()).toBe('0');
  });

  it('throws an error if royaltyRecipient parameter is a not an address', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: 'InvalidRoyaltyRecipient',
      royaltyBps: 1000,
    };

    async function create() {
      await sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow('Invalid wallet or contract address');
  });

  it('throws an error if royaltyBps parameter is a not a BigNumber', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: walletAddress,
      royaltyBps: 'InvalidRoyaltyBps',
    };

    async function create() {
      await sdk.App.createNFT(params);
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
    };

    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function create() {
      await sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});

describe('NFTDrop', () => {
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

  it('creates an NFTDrop contract and returns an instance of it', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: walletAddress,
      royaltyBps: 1000,
    };

    const contract = await sdk.App.createNFTDrop(params);
    const totalSupply = await contract.totalSupply();

    expect(totalSupply.toString()).toBe('0');
  });

  it('throws an error if royaltyRecipient parameter is a not an address', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: 'InvalidRoyaltyRecipient',
      royaltyBps: 1000,
    };

    async function create() {
      await sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow('Invalid wallet or contract address');
  });

  it('throws an error if royaltyBps parameter is a not a BigNumber', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: walletAddress,
      royaltyBps: 'InvalidRoyaltyBps',
    };

    async function create() {
      await sdk.App.createNFT(params);
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
    };

    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function create() {
      await sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});

describe('Token', () => {
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

  it('creates an Token contract and returns an instance of it', async () => {
    const params: ERC20CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      decimal: 18,
      supply: 1000,
    };

    const contract = await sdk.App.createToken(params);

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
    };

    async function create() {
      await sdk.App.createToken(params);
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
    };

    async function create() {
      await sdk.App.createToken(params);
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
    };

    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function create() {
      await sdk.App.createToken(params);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});
