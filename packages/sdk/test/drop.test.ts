import { ethers } from 'ethers';
import {
  ERC721LazyMint,
  ERC721LazyMint_ClaimParams,
  ERC721LazyMint_LazyMintParams,
  ERC721LazyMint_SetClaimConditionParams,
  ERC721LazyMint_VerifyClaimParams,
} from '../src';
import { ERC721LazyDropStorage } from '../src/contract-types/facet/ERC721LazyDropFacet';
import { WALLETS, ZERO_ADDRESS } from './utilities';

describe('NFTDrop', () => {
  let contract: ERC721LazyMint = global.NFTDrop;
  let condition: ERC721LazyDropStorage.ClaimConditionStruct;
  let PRICE_PER_TOKEN = 10;

  beforeAll(async () => {
    await global.sdk.App.setApplicationFee({
      percentageBPS: 1000,
      recipient: WALLETS[0],
    });

    condition = {
      startTimestamp: Math.floor(Date.now() / 1000),
      endTimestamp: Math.floor(Date.now() * 1000),
      supplyClaimed: 0,
      maxClaimableSupply: 50,
      quantityLimitPerWallet: 5,
      pricePerToken: PRICE_PER_TOKEN,
      currency: ZERO_ADDRESS,
    };

    await global.sdk.App.setAcceptedCurrencies({
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

  afterAll(async () => {
    await global.sdk.App.setApplicationFee({
      percentageBPS: 0,
      recipient: WALLETS[0],
    });
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
        receiver: WALLETS[0],
        quantity: 1,
        currency: ZERO_ADDRESS,
        pricePerToken: PRICE_PER_TOKEN,
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
