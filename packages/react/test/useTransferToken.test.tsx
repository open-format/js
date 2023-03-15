import '@testing-library/jest-dom';
import React from 'react';
import { useContract, useMintToken, useTransferToken } from '../src/hooks';
import {
  ERC20_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
  WALLET_ADDRESS2,
} from './utilities';

function Transfer({ address }: { address: string }) {
  const { data: token } = useContract(address);
  const { mint } = useMintToken(token);
  const { data, transfer } = useTransferToken(token);

  async function handleMintAndTransfer() {
    await mint([WALLET_ADDRESS, 1]);
    await transfer([WALLET_ADDRESS2, 1]);
  }

  return (
    <>
      {token && (
        <>
          <button onClick={handleMintAndTransfer} data-testid="transfer">
            Transfer
          </button>
          {data && <span data-testid="receipt">{data.status}</span>}
        </>
      )}
    </>
  );
}

describe('useTransfer()', () => {
  it('transfers a given token', async () => {
    render(<Transfer address={ERC20_CONTRACT_ADDRESS} />);
    const transferButton = await waitFor(() => screen.getByTestId('transfer'));
    transferButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});