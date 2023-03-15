import '@testing-library/jest-dom';
import React from 'react';
import { useContract, useMintNFT, useTransferNFT } from '../src/hooks';
import {
  ERC721_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
  WALLET_ADDRESS2,
} from './utilities';

function Transfer({ address }: { address: string }) {
  const { data: nft } = useContract(address);
  const { mint } = useMintNFT(nft);
  const { data, transfer } = useTransferNFT(nft);

  async function handleMintAndTransfer() {
    const tokenId = await nft?.nextTokenIdToMint();
    await mint([WALLET_ADDRESS, 'ipfs://']);

    if (tokenId) {
      await transfer([WALLET_ADDRESS, WALLET_ADDRESS2, tokenId]);
    }
  }

  return (
    <>
      {nft && (
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
    render(<Transfer address={ERC721_CONTRACT_ADDRESS} />);
    const transferButton = await waitFor(() => screen.getByTestId('transfer'));
    transferButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
