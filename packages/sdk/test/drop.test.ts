import { ethers } from 'ethers';
import {
  Chains,
  ERC721LazyMint,
  ERC721LazyMint_ClaimParams,
  ERC721LazyMint_LazyMintParams,
  ERC721LazyMint_SetClaimConditionParams,
  ERC721LazyMint_VerifyClaimParams,
  OpenFormatSDK,
} from '../src';
import { ERC721LazyDropStorage } from '../src/contract-types/facet/ERC721LazyDropFacet';
import {
  APP_ID,
  NFT_DROP_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  ZERO_ADDRESS,
} from './utilities';

describe('NFTDrop', () => {
  let sdk: OpenFormatSDK;
  let contract: ERC721LazyMint;
  let walletAddress: string;
  let condition: ERC721LazyDropStorage.ClaimConditionStruct;

  beforeAll(async () => {
    sdk = new OpenFormatSDK({
      network: Chains.foundry,
      appId: APP_ID,
      signer: PRIVATE_KEY,
    });

    contract = (await sdk.getContract({
      contractAddress: NFT_DROP_CONTRACT_ADDRESS,
    })) as ERC721LazyMint;

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }

    condition = {
      startTimestamp: Math.floor(Date.now() / 1000),
      supplyClaimed: 0,
      maxClaimableSupply: 50,
      quantityLimitPerWallet: 5,
      pricePerToken: 0,
      currency: ZERO_ADDRESS,
    };

    await sdk.App.setAcceptedCurrencies({
      currencies: [ZERO_ADDRESS],
      approvals: [true],
    });

    const params: ERC721LazyMint_LazyMintParams = {
      amount: 50,
      baseURIForTokens: 'ipfs://',
      data: '',
    };
    await contract.lazyMint(params);
  });

  describe('setClaimConditions()', () => {
    it('sets a claim condition on an NFT contract', async () => {
      const params: ERC721LazyMint_SetClaimConditionParams = {
        condition,
        resetClaimEligibility: true,
      };
      const tx = await contract.setClaimConditions(params);

      expect(tx.status).toBe(1);
    });
  });

  describe('getClaimCondition()', () => {
    it('gets the current claim condition', async () => {
      const tx = await contract.getClaimCondition();

      expect(tx.startTimestamp.toNumber()).toBeCloseTo(
        condition.startTimestamp as number,
        50
      );
      expect(tx.supplyClaimed.toNumber()).toBe(condition.supplyClaimed);
      expect(tx.maxClaimableSupply.toNumber()).toBe(
        condition.maxClaimableSupply
      );
      expect(tx.quantityLimitPerWallet.toNumber()).toBe(
        condition.quantityLimitPerWallet
      );
      expect(tx.pricePerToken.toNumber()).toBe(condition.pricePerToken);
      expect(tx.currency.toString()).toBe(condition.currency);
    });
  });

  describe('removeClaimCondition()', () => {
    it('remove the current claim condition', async () => {
      const tx = await contract.removeClaimCondition();
      expect(tx.status).toBe(1);
    });
  });

  describe('claim()', () => {
    it('should claim a single NFT', async () => {
      const setClaimParams: ERC721LazyMint_SetClaimConditionParams = {
        condition,
        resetClaimEligibility: true,
      };

      await contract.setClaimConditions(setClaimParams);

      const params: ERC721LazyMint_ClaimParams = {
        receiver: walletAddress,
        quantity: 1,
        currency: ZERO_ADDRESS,
        pricePerToken: 0,
      };
      const tx = await contract.claim(params);

      expect(tx.status).toBe(1);
    });
  });

  describe('verifyClaim()', () => {
    it('should successfully verify a claim', async () => {
      const newClaimer = ethers.Wallet.createRandom().address;
      const params: ERC721LazyMint_VerifyClaimParams = {
        claimer: newClaimer,
        quantity: 1,
        currency: condition.currency,
        pricePerToken: condition.pricePerToken,
      };
      const tx = await contract.verifyClaim(params);

      expect(tx).toBeTruthy();
    });
  });
});
