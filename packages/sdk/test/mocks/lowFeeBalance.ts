import { BaseContract, Reward, toWei } from '../../src';

/**
 * Mocks the `getUserBalance` method of the `BaseContract` class to simulate a low balance scenario for fee payment.
 * This function overrides the original `getUserBalance` method with a jest mock, which resolves to a balance of 0.1 ETH in wei,
 * representing an insufficient balance to cover transaction fees.
 *
 * @returns {Reward} An instance of the `Reward` class with the mocked balance method for testing purposes.
 *
 * @example
 * // Use within a test to create a `Reward` instance with a mocked low balance
 * const rewardInstanceWithLowBalance = mockLowFeeBalance();
 *
 */
export function mockLowFeeBalance(): any {
  return ((BaseContract as any).prototype.getUserBalance = jest
    .fn()
    .mockResolvedValue(toWei('0')));
}
