import { ERC721Instance, OpenFormatSDK } from '../src';
import { address } from '../src/helpers/validation';

const APP_ID = address('0x1ade2613adb6bafbc65d40eb9c1effbe3bfd8b81');
const ERC721_CONTRACT_ADDRESS = '0xd345f05a1babe8c196849f3f7764e5a9badde172';

// Anvil local pk
const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

describe('sdk', () => {
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

  it('throws an error if contract address is invalid', async () => {
    async function createInstance() {
      await sdk.ERC721.getContract('0x');
    }

    await expect(createInstance).rejects.toThrow('Invalid contract address');
  });

  it('mints a token if wallet and metadata are valid', async () => {
    const params: [string, string] = [walletAddress, 'ipfs://'];
    const tx = await contract.mint(params);

    const mintedEvent = tx.events?.find((event) => event.event === 'Minted');

    if (mintedEvent?.args) {
      expect(mintedEvent.args[0]).toBe(walletAddress);
    }
    expect(tx.status).toBe(1);
  });

  it('minting fails if to address is not valid', async () => {
    const params: [string, string] = ['0x1', 'ipfs://'];

    async function mint() {
      await contract.mint(params);
    }

    await expect(mint()).rejects.toThrow('Invalid wallet or contract address');
  });

  it('minting fails if to metadata URL is not valid', async () => {
    const params: [string, string] = [walletAddress, 'invalid'];

    async function mint() {
      await contract.mint(params);
    }

    await expect(mint()).rejects.toThrow('Invalid metadata URL');
  });

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

  it('batch minting fails if to address is not valid', async () => {
    const params: [string, number, string] = ['0x1', 5, 'ipfs://'];

    async function batchMint() {
      await contract.batchMint(params);
    }

    await expect(batchMint()).rejects.toThrow(
      'Invalid wallet or contract address'
    );
  });

  it('batch minting fails if to metadata URL is not valid', async () => {
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
