import {
  Chains,
  ERC20CreateParams,
  ERC721CreateParams,
  OpenFormatSDK,
} from '../src';
import { toWei } from '../src/helpers';

describe('NFT', () => {
  it('creates an NFT contract and returns an instance of it', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: global.walletAddress,
      royaltyBps: 1000,
    };

    const contract = await global.sdk.App.createNFT(params);
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
      await global.sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow('Invalid wallet or contract address');
  });

  it('throws an error if royaltyBps parameter is a not a BigNumber', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: global.walletAddress,
      royaltyBps: 'InvalidRoyaltyBps',
    };

    async function create() {
      await global.sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if a signer is not passed', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: global.walletAddress,
      royaltyBps: 1000,
    };

    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      starId: global.star,
    });

    async function create() {
      await sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});

describe('NFTDrop', () => {
  it('creates an NFTDrop contract and returns an instance of it', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: global.walletAddress,
      royaltyBps: 1000,
    };

    const contract = await global.sdk.App.createNFTDrop(params);
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
      await global.sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow('Invalid wallet or contract address');
  });

  it('throws an error if royaltyBps parameter is a not a BigNumber', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: global.walletAddress,
      royaltyBps: 'InvalidRoyaltyBps',
    };

    async function create() {
      await global.sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if a signer is not passed', async () => {
    const params: ERC721CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      royaltyRecipient: global.walletAddress,
      royaltyBps: 1000,
    };

    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      starId: global.star,
    });

    async function create() {
      await sdk.App.createNFT(params);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});

describe('Token', () => {
  it('creates an Token contract and returns an instance of it', async () => {
    const AMOUNT = toWei('0.001');
    const params: ERC20CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      supply: AMOUNT,
    };

    const contract = await global.sdk.App.createToken(params);

    if (contract) {
      const balanceOf = await contract.balanceOf({
        account: global.walletAddress,
      });
      expect(balanceOf).toBe(AMOUNT.toString());
    }
  });

  it('throws an error if supply parameter is a not a BigNumber', async () => {
    const params: ERC20CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      supply: 'InvalidSupply',
    };

    async function create() {
      await global.sdk.App.createToken(params);
    }

    await expect(create).rejects.toThrow(
      'Invalid amount. Please check you are passing a valid number'
    );
  });

  it('throws an error if a signer is not passed', async () => {
    const params: ERC20CreateParams = {
      name: 'TEST',
      symbol: 'NFT',
      supply: 1000,
    };

    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      starId: global.star,
    });

    async function create() {
      await sdk.App.createToken(params);
    }

    await expect(create).rejects.toThrow('Signer undefined');
  });
});
