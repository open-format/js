import { ERC721Instance, OpenFormatSDK } from '../src';
import {
  APP_ID,
  ERC721_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  WALLET_ADDRESS2,
} from './utilities';

describe('transfer()', () => {
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
      contractAddress: ERC721_CONTRACT_ADDRESS,
    })) as ERC721Instance;

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });

  it('transfers a token', async () => {
    const nextId = await contract.nextTokenIdToMint();
    await contract.mint([walletAddress, 'ipfs://']);
    await contract.transfer([walletAddress, WALLET_ADDRESS2, nextId]);
    const ownerOf = await contract.ownerOf([nextId]);
    expect(ownerOf.toString()).toBe(WALLET_ADDRESS2);
  });

  it('throws an error if non existent token is attempted to be transferred', async () => {
    const nextId = await contract.nextTokenIdToMint();
    await contract.mint([walletAddress, 'ipfs://']);

    async function transfer() {
      await contract.transfer([walletAddress, WALLET_ADDRESS2, nextId.add(1)]);
    }

    await expect(transfer).rejects.toThrow('OwnerQueryForNonexistentToken');
  });

  it('throws an error if token transferred is not owned by signer', async () => {
    const nextId = await contract.nextTokenIdToMint();
    await contract.mint([walletAddress, 'ipfs://']);
    await contract.transfer([walletAddress, WALLET_ADDRESS2, nextId]);

    async function transfer() {
      await contract.transfer([walletAddress, WALLET_ADDRESS2, nextId]);
    }

    await expect(transfer).rejects.toThrow('TransferFromIncorrectOwner');
  });
});
