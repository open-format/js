import '@testing-library/jest-dom';
import React from 'react';
import { useApprove, useContract, useMint } from '../src/hooks';
import {
  ERC721_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
  WALLET_ADDRESS2,
} from './utilities';

function Approve({ address }: { address: string }) {
  const { data: nft } = useContract(address);
  const { mint } = useMint(nft);
  const { data, approve } = useApprove(nft);

  async function handleMintAndApprove() {
    const tokenId = await nft?.nextTokenIdToMint();
    await mint([WALLET_ADDRESS, 'ipfs://']);

    if (tokenId) {
      await approve([WALLET_ADDRESS2, tokenId]);
    }
  }

  return (
    <>
      {nft && (
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
    render(<Approve address={ERC721_CONTRACT_ADDRESS} />);
    const approveButton = await waitFor(() => screen.getByTestId('approve'));
    approveButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
