import { ERC721Instance, OpenFormatSDK } from '../src';
import {
  APP_ID,
  ERC721_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  WALLET_ADDRESS2,
} from './utilities';

describe('approve()', () => {
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

  it('approves another wallet to transfer a token', async () => {
    const tokenId = await contract.nextTokenIdToMint();
    await contract.mint([walletAddress, 'ipfs://']);
    await contract.approve([WALLET_ADDRESS2, tokenId]);
    const approved = await contract.getApproved([tokenId]);
    expect(approved.toString()).toBe(WALLET_ADDRESS2);
  });

  it('throws an error if token attempted to be transferred does not exist', async () => {
    const tokenId = await contract.nextTokenIdToMint();
    await contract.mint([walletAddress, 'ipfs://']);

    async function approve() {
      await contract.approve([WALLET_ADDRESS2, tokenId.add(1)]);
    }

    await expect(approve).rejects.toThrow('OwnerQueryForNonexistentToken');
  });

  it('throws an error if token attempted to be approved is not owned by signer', async () => {
    const tokenId = await contract.nextTokenIdToMint();
    await contract.mint([walletAddress, 'ipfs://']);
    await contract.transfer([walletAddress, WALLET_ADDRESS2, tokenId]);

    async function approve() {
      await contract.approve([WALLET_ADDRESS2, tokenId]);
    }

    await expect(approve).rejects.toThrow('ApprovalCallerNotOwnerNorApproved');
  });
});
