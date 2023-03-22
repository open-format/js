import {
  ERC20Instance,
  ERC721Instance,
  ERC721MintParams,
  ERC721TransferParams,
  OpenFormatSDK,
} from '../src';
import {
  APP_ID,
  ERC20_CONTRACT_ADDRESS,
  ERC721_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  WALLET_ADDRESS2,
} from './utilities';

describe('ERC721', () => {
  describe('transfer()', () => {
    let sdk: OpenFormatSDK;
    let contract: ERC721Instance;

    let walletAddress: string;
    let ERC721MintParams: ERC721MintParams;

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
        ERC721MintParams = { to: walletAddress, tokenURI: 'ipfs://' };
      }
    });

    it('transfers a token', async () => {
      const nextId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      const params: ERC721TransferParams = {
        from: walletAddress,
        to: WALLET_ADDRESS2,
        tokenId: nextId,
      };
      await contract.transfer(params);
      const ownerOf = await contract.ownerOf({ tokenId: nextId });
      expect(ownerOf.toString()).toBe(WALLET_ADDRESS2);
    });

    it('throws an error if non existent token is attempted to be transferred', async () => {
      const nextId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      const params: ERC721TransferParams = {
        from: walletAddress,
        to: WALLET_ADDRESS2,
        tokenId: nextId.add(1),
      };

      async function transfer() {
        await contract.transfer(params);
      }

      await expect(transfer).rejects.toThrow('OwnerQueryForNonexistentToken');
    });

    it('throws an error if token transferred is not owned by signer', async () => {
      const nextId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      const params: ERC721TransferParams = {
        from: walletAddress,
        to: WALLET_ADDRESS2,
        tokenId: nextId,
      };

      await contract.transfer(params);

      async function transfer() {
        await contract.transfer(params);
      }

      await expect(transfer).rejects.toThrow('TransferFromIncorrectOwner');
    });
  });
});

// @TODO Increase test coverage for ERC20 transfer
describe('ERC20', () => {
  describe('transfer()', () => {
    let sdk: OpenFormatSDK;
    let contract: ERC20Instance;
    let walletAddress: string;

    beforeAll(async () => {
      sdk = new OpenFormatSDK({
        network: 'localhost',
        appId: APP_ID,
        signer: PRIVATE_KEY,
      });

      contract = (await sdk.getContract({
        contractAddress: ERC20_CONTRACT_ADDRESS,
      })) as ERC20Instance;

      if (sdk.signer) {
        walletAddress = await sdk.signer?.getAddress();
      }
    });

    it('transfers a token', async () => {
      const receiverBalance = await contract.balanceOf({
        account: WALLET_ADDRESS2,
      });
      await contract.transfer({ to: WALLET_ADDRESS2, amount: 100 });
      const newReceiverBalance = await contract.balanceOf({
        account: WALLET_ADDRESS2,
      });

      expect(newReceiverBalance).toBe(receiverBalance + 100);
    });
  });
});
