import { AppSetCreatorAccessParams } from '../src';
import { WALLETS, ZERO_ADDRESS } from './utilities';

describe('App', () => {
  beforeEach(async () => {
    await global.sdk.App.setCreatorAccess({
      accounts: [ZERO_ADDRESS, WALLETS[0], WALLETS[1], WALLETS[2]],
      approvals: [false, false, false, false],
    });
  });

  describe('setCreatorAccess()', () => {
    it('should by default only allow the owner to create contracts', async () => {
      const hasCreatorAccess = await global.sdk.App.hasCreatorAccess({
        account: WALLETS[1],
      });
      const hasCreatorAccessOwner = await global.sdk.App.hasCreatorAccess({
        account: WALLETS[0],
      });

      expect(hasCreatorAccess).toBe(false);

      //Owner always has access even though set to false in BeforeEach
      expect(hasCreatorAccessOwner).toBe(true);
    });

    it(`gives ${WALLETS[1]} access to creator contracts`, async () => {
      const params: AppSetCreatorAccessParams = {
        accounts: [WALLETS[1]],
        approvals: [true],
      };

      await global.sdk.App.setCreatorAccess(params);

      const hasCreatorAccess = await global.sdk.App.hasCreatorAccess({
        account: WALLETS[1],
      });

      expect(hasCreatorAccess).toBe(true);
    });

    it('gives anyone access to creator contracts', async () => {
      const params: AppSetCreatorAccessParams = {
        accounts: [ZERO_ADDRESS],
        approvals: [true],
      };

      await global.sdk.App.setCreatorAccess(params);

      const hasCreatorAccess = await global.sdk.App.hasCreatorAccess({
        account: WALLETS[2],
      });

      expect(hasCreatorAccess).toBe(true);
    });
  });

  describe('setAcceptedCurrencies()', () => {
    it('should accept ETH as acceptedCurrencies', async () => {
      const tx = await global.sdk.App.setAcceptedCurrencies({
        currencies: [ZERO_ADDRESS],
        approvals: [true],
      });

      expect(tx.status).toBe(1);
    });
  });
});
