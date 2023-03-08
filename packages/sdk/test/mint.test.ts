import { ERC721Instance, OpenFormatSDK } from '../src';
import { APP_ID, ERC721_CONTRACT_NAME, PRIVATE_KEY } from './utilities';

describe('ERC721', () => {
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
      name: ERC721_CONTRACT_NAME,
    })) as ERC721Instance;

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });

  describe('mint()', () => {
    it('mints a token if wallet and metadata are valid', async () => {
      const params: [string, string] = [walletAddress, 'ipfs://'];
      const tx = await contract.mint(params);

      const mintedEvent = tx.events?.find((event) => event.event === 'Minted');

      if (mintedEvent?.args) {
        expect(mintedEvent.args[0]).toBe(walletAddress);
      }
      expect(tx.status).toBe(1);
    });

    it('throws an error if contract address is invalid', async () => {
      async function createInstance() {
        await sdk.ERC721.getContract('0x');
      }

      await expect(createInstance).rejects.toThrow('Invalid contract address');
    });

    it('throws an error if to address is not valid', async () => {
      const params: [string, string] = ['0x1', 'ipfs://'];

      async function mint() {
        await contract.mint(params);
      }

      await expect(mint()).rejects.toThrow(
        'Invalid wallet or contract address'
      );
    });

    it('throws an error if to metadata URL is not valid', async () => {
      const params: [string, string] = [walletAddress, 'invalid'];

      async function mint() {
        await contract.mint(params);
      }

      await expect(mint()).rejects.toThrow('Invalid metadata URL');
    });
  });

  describe('batchMint()', () => {
    // BATCH MINTING
    it('batch mints 5 tokens if wallet and metadata are valid', async () => {
      const params: [string, number, string] = [walletAddress, 5, 'ipfs://'];
      const tx = await contract.batchMint(params);

      const mintedEvent = tx.events?.find((event) => event.event === 'Minted');

      if (mintedEvent?.args) {
        expect(mintedEvent.args[0]).toBe(walletAddress);
      }
      expect(tx.status).toBe(1);
    });

    it('throws an error if to address is not valid', async () => {
      const params: [string, number, string] = ['0x1', 5, 'ipfs://'];

      async function batchMint() {
        await contract.batchMint(params);
      }

      await expect(batchMint()).rejects.toThrow(
        'Invalid wallet or contract address'
      );
    });

    it('throws an error if to metadata URL is not valid', async () => {
      const params: [string, number, string] = [walletAddress, 5, 'invalid'];

      async function batchMint() {
        await contract.batchMint(params);
      }

      await expect(batchMint()).rejects.toThrow('Invalid metadata URL');
    });

    it('throws an error if ERC721 contract is invalid', async () => {
      //@TODO: I need to try and get a contract that isn't a ERC721 that exists in the subgraph.

      async function createInstance() {
        return new ERC721Instance(sdk.provider, APP_ID, '0x1', sdk.signer);
      }

      expect(createInstance()).rejects.toThrow('Failed to get contract');
    });
  });
});
