import '@testing-library/jest-dom';
import React from 'react';
import { useContract, useMintToken } from '../src/hooks';
import {
  ERC20_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
} from './utilities';

function MintToken({ address }: { address: string }) {
  const { data: nft } = useContract(address);
  const { data, mint } = useMintToken(nft);

  async function handleMint() {
    await mint([WALLET_ADDRESS, 1000]);
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
  it('allows you to mint an NFT from a deployed ERC721 contract', async () => {
    render(<MintToken address={ERC20_CONTRACT_ADDRESS} />);
    const mintButton = await waitFor(() => screen.getByTestId('mint'));
    mintButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
