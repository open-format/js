import { AppSetCreatorAccessParams, OpenFormatSDK } from '../src';
import {
  APP_ID,
  PRIVATE_KEY,
  WALLET_ADDRESS2,
  WALLET_ADDRESS3,
  ZERO_ADDRESS,
} from './utilities';

describe('App', () => {
  let sdk: OpenFormatSDK;
  let walletAddress: string;

  beforeAll(async () => {
    sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
      signer: PRIVATE_KEY,
    });

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });

  beforeEach(async () => {
    await sdk.App.setCreatorAccess({
      accounts: [ZERO_ADDRESS, walletAddress, WALLET_ADDRESS2, WALLET_ADDRESS3],
      approvals: [false, false, false, false],
    });
  });

  describe('setCreatorAccess()', () => {
    it('should by default only allow the owner to create contracts', async () => {
      const hasCreatorAccess = await sdk.App.hasCreatorAccess({
        account: WALLET_ADDRESS2,
      });
      const hasCreatorAccessOwner = await sdk.App.hasCreatorAccess({
        account: walletAddress,
      });

      expect(hasCreatorAccess).toBe(false);

      //Owner always has access even though set to false in BeforeEach
      expect(hasCreatorAccessOwner).toBe(true);
    });

    it(`gives ${WALLET_ADDRESS2} access to creator contracts`, async () => {
      const params: AppSetCreatorAccessParams = {
        accounts: [WALLET_ADDRESS2],
        approvals: [true],
      };

      await sdk.App.setCreatorAccess(params);

      const hasCreatorAccess = await sdk.App.hasCreatorAccess({
        account: WALLET_ADDRESS2,
      });

      expect(hasCreatorAccess).toBe(true);
    });

    it('gives anyone access to creator contracts', async () => {
      const params: AppSetCreatorAccessParams = {
        accounts: [ZERO_ADDRESS],
        approvals: [true],
      };

      await sdk.App.setCreatorAccess(params);

      const hasCreatorAccess = await sdk.App.hasCreatorAccess({
        account: WALLET_ADDRESS3,
      });

      expect(hasCreatorAccess).toBe(true);
    });
  });

  describe('setAcceptedCurrencies()', () => {
    it('should accept ETH as acceptedCurrencies', async () => {
      const tx = await sdk.App.setAcceptedCurrencies({
        currencies: [ZERO_ADDRESS],
        approvals: [true],
      });

      expect(tx.status).toBe(1);
    });
  });
});
