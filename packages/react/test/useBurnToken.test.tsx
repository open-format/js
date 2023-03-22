import { ERC20Instance } from '@openformat/sdk';
import '@testing-library/jest-dom';
import React from 'react';
import { useBurnToken, useContract, useMintToken } from '../src/hooks';
import {
  ERC20_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
} from './utilities';

function Burn({ address }: { address: string }) {
  const { data: token } = useContract(address);
  const { mint } = useMintToken(token as ERC20Instance);
  const { data, burn } = useBurnToken(token as ERC20Instance);

  async function handleMintAndBurn() {
    await mint({ to: WALLET_ADDRESS, amount: 1 });
    await burn({ amount: 1 });
  }

  return (
    <>
      {token && (
        <>
          <button onClick={handleMintAndBurn} data-testid="burn">
            Burn
          </button>
          {data && <span data-testid="receipt">{data.status}</span>}
        </>
      )}
    </>
  );
}

describe('useBurn()', () => {
  it('burns a given token', async () => {
    render(<Burn address={ERC20_CONTRACT_ADDRESS} />);
    const burnButton = await waitFor(() => screen.getByTestId('burn'));
    burnButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
