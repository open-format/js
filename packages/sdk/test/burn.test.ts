import { ERC721Instance, OpenFormatSDK } from '../src';
import { APP_ID, ERC721_CONTRACT_NAME, PRIVATE_KEY } from './utilities';

describe('burn()', () => {
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

  it('burns a token', async () => {
    const nextId = await contract.nextTokenIdToMint();
    await contract.mint([walletAddress, 'ipfs://']);
    const tx = await contract.burn([nextId]);
    expect(tx.status).toBe(1);
  });

  it('throws an error if non existent token is passed', async () => {
    const nextId = await contract.nextTokenIdToMint();
    await contract.mint([walletAddress, 'ipfs://']);

    async function burn() {
      await contract.burn([nextId.add(1)]);
    }

    await expect(burn).rejects.toThrow('OwnerQueryForNonexistentToken');
  });
});
