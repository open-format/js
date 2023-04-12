import {
  Chains,
  ERC20Base,
  ERC20MintParams,
  ERC721Base,
  OpenFormatSDK,
} from '../src';
import {
  APP_ID,
  ERC20_CONTRACT_ADDRESS,
  ERC721_CONTRACT_ADDRESS,
  PRIVATE_KEY,
} from './utilities';

describe('ERC721', () => {
  let sdk: OpenFormatSDK;
  let contract: ERC721Base;
  let walletAddress: string;

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
    }
  });

  describe('mint()', () => {
    it('mints a token if wallet and metadata are valid', async () => {
      const params = {
        to: walletAddress,
        tokenURI: 'ipfs://',
      };
      const tx = await contract.mint(params);

      const mintedEvent = tx.events?.find((event) => event.event === 'Minted');

      if (mintedEvent?.args) {
        expect(mintedEvent.args[0]).toBe(walletAddress);
      }
      expect(tx.status).toBe(1);
    });

    it('throws an error if to address is not valid', async () => {
      const params = {
        to: '0x1',
        tokenURI: 'ipfs://',
      };

      async function mint() {
        await contract.mint(params);
      }

      await expect(mint()).rejects.toThrow(
        'Error: Invalid wallet or contract address'
      );
    });

    it('throws an error if to metadata URL is not valid', async () => {
      const params = {
        to: walletAddress,
        tokenURI: 'invalid',
      };

      async function mint() {
        await contract.mint(params);
      }

      await expect(mint()).rejects.toThrow('Invalid metadata URL');
    });
  });

  describe('batchMint()', () => {
    // BATCH MINTING
    it('batch mints 5 tokens if wallet and metadata are valid', async () => {
      const params = {
        to: walletAddress,
        quantity: 5,
        baseURI: 'ipfs://',
      };

      const tx = await contract.batchMint(params);

      const mintedEvent = tx.events?.find((event) => event.event === 'Minted');

      if (mintedEvent?.args) {
        expect(mintedEvent.args[0]).toBe(walletAddress);
      }
      expect(tx.status).toBe(1);
    });

    it('throws an error if to address is not valid', async () => {
      const params = {
        to: '0x1',
        quantity: 5,
        baseURI: 'ipfs://',
      };

      async function batchMint() {
        await contract.batchMint(params);
      }

      await expect(batchMint()).rejects.toThrow(
        'Invalid wallet or contract address'
      );
    });

    it('throws an error if to metadata URL is not valid', async () => {
      const params = {
        to: walletAddress,
        quantity: 5,
        baseURI: 'invalid',
      };

      async function batchMint() {
        await contract.batchMint(params);
      }

      await expect(batchMint()).rejects.toThrow('Invalid metadata URL');
    });

    it('throws an error if ERC721 contract is invalid', async () => {
      //@TODO: I need to try and get a contract that isn't a ERC721 that exists in the subgraph.

      async function createInstance() {
        return new ERC721Base(sdk.provider, APP_ID, '0x1', sdk.signer);
      }

      expect(createInstance()).rejects.toThrow('Failed to get contract');
    });
  });
});

describe('ERC20', () => {
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

  describe('mint()', () => {
    const AMOUNT = 100;
    it('mints 100 tokens if to address is valid', async () => {
      const params: ERC20MintParams = {
        to: walletAddress,
        amount: AMOUNT,
      };
      const tx = await contract.mint(params);

      const mintedEvent = tx.events?.find((event) => event.event === 'Minted');

      if (mintedEvent?.args) {
        expect(mintedEvent.args[0]).toBe(walletAddress);
      }
      expect(tx.status).toBe(1);
    });

    it('throws an error if to address is not valid', async () => {
      const params: ERC20MintParams = {
        to: '0x1',
        amount: AMOUNT,
      };

      async function mint() {
        await contract.mint(params);
      }

      await expect(mint()).rejects.toThrow(
        'Invalid wallet or contract address'
      );
    });

    it('throws an error if amount is not valid', async () => {
      const params: ERC20MintParams = {
        to: walletAddress,
        amount: 'NaN',
      };

      async function mint() {
        await contract.mint(params);
      }

      await expect(mint()).rejects.toThrow(
        'Invalid amount. Please check you are passing a valid number'
      );
    });
  });
});
