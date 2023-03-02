import '@testing-library/jest-dom';
import React from 'react';
import { useBatchMint, useContract } from '../src/hooks';
import { render, screen, waitFor } from '../src/utilities';
import * as constants from './constants';

function Mint({ address }: { address: string }) {
  const nft = useContract(address);
  const { data, batchMint } = useBatchMint(nft);

  async function handleMint() {
    await batchMint([constants.WALLET_ADDRESS2, 5, 'ipfs://']);
  }

  return (
    <>
      {nft && (
        <>
          <button onClick={handleMint} data-testid="mint">
            Mint
          </button>
          {data && <span data-testid="receipt">{data.status}</span>}
        </>
      )}
    </>
  );
}

describe('useMint', () => {
  it('allows you to mint a deployed Open Format contract', async () => {
    render(<Mint address={constants.ERC721_CONTRACT_ADDRESS} />);
    const mintButton = await waitFor(() => screen.getByTestId('mint'));
    mintButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
