import { ERC20Instance } from '@openformat/sdk';
import '@testing-library/jest-dom';
import React from 'react';
import { useApproveToken, useContract, useMintToken } from '../src/hooks';
import {
  ERC20_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
  WALLET_ADDRESS2,
} from './utilities';

function Approve({ address }: { address: string }) {
  const { data: token } = useContract(address);
  const { mint } = useMintToken(token as ERC20Instance);
  const { data, approve } = useApproveToken(token as ERC20Instance);

  async function handleMintAndApprove() {
    await mint({ to: WALLET_ADDRESS, amount: 1 });
    await approve({ spender: WALLET_ADDRESS2, amount: 1 });
  }

  return (
    <>
      {token && (
        <>
          <button onClick={handleMintAndApprove} data-testid="approve">
            Approve
          </button>
          {data && <span data-testid="receipt">{data.status}</span>}
        </>
      )}
    </>
  );
}

describe('useApprove()', () => {
  it('approves another wallet to transfer a token', async () => {
    render(<Approve address={ERC20_CONTRACT_ADDRESS} />);
    const approveButton = await waitFor(() => screen.getByTestId('approve'));
    approveButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
