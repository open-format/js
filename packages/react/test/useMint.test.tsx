import '@testing-library/jest-dom';
import React from 'react';
import { useContract, useMint } from '../src/hooks';
import {
  ERC721_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
} from './utilities';

function Mint({ address }: { address: string }) {
  const { data: nft } = useContract(address);
  const { data, mint } = useMint(nft);

  async function handleMint() {
    await mint([WALLET_ADDRESS, 'ipfs://']);
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
    render(<Mint address={ERC721_CONTRACT_ADDRESS} />);
    const mintButton = await waitFor(() => screen.getByTestId('mint'));
    mintButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
