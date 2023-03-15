import '@testing-library/jest-dom';
import React from 'react';
import { useContract, useMintNFT } from '../src/hooks';
import {
  ERC721_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
} from './utilities';

function MintNFT({ address }: { address: string }) {
  const { data: nft } = useContract(address);
  const { data, mint } = useMintNFT(nft);

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
  it('allows you to mint an NFT from a deployed ERC721 contract', async () => {
    render(<MintNFT address={ERC721_CONTRACT_ADDRESS} />);
    const mintButton = await waitFor(() => screen.getByTestId('mint'));
    mintButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});