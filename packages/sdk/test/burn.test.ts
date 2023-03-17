import {
  ERC20Instance,
  ERC721Instance,
  ERC721MintParams,
  OpenFormatSDK,
} from '../src';
import {
  APP_ID,
  ERC20_CONTRACT_ADDRESS,
  ERC721_CONTRACT_ADDRESS,
  PRIVATE_KEY,
} from './utilities';

describe('ERC721', () => {
  describe('burn()', () => {
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
      }
      ERC721MintParams = { to: walletAddress, tokenURI: 'ipfs://' };
    });

    it('burns a token', async () => {
      const nextId = await contract.nextTokenIdToMint();

      await contract.mint(ERC721MintParams);
      const tx = await contract.burn({ tokenId: nextId });
      expect(tx.status).toBe(1);
    });

    it('throws an error if non existent token is passed', async () => {
      const nextId = await contract.nextTokenIdToMint();
      await contract.mint(ERC721MintParams);

      async function burn() {
        await contract.burn({ tokenId: nextId.add(1) });
      }

      await expect(burn).rejects.toThrow('OwnerQueryForNonexistentToken');
    });
  });
});
describe('ERC20', () => {
  describe('burn()', () => {
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

    it('burns a token', async () => {
      await contract.mint({ to: walletAddress, amount: 1 });
      const tx = await contract.burn({ amount: 1 });
      expect(tx.status).toBe(1);
    });

    it('throws an error if non existent token is passed', async () => {
      await contract.mint({ to: walletAddress, amount: 1 });
      const walletBalance = await contract.balanceOf({
        account: walletAddress,
      });

      async function burn() {
        await contract.burn({ amount: walletBalance + 1 });
      }

      //@TODO update error when errors in contract are updated
      await expect(burn).rejects.toThrow(
        'no matching error (argument="sighash", value="0x08c379a0", code=INVALID_ARGUMENT, version=abi/5.7.0)'
      );
    });
  });
});
