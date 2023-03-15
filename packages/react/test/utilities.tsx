import { render, RenderOptions } from '@testing-library/react';
import { ethers } from 'ethers';
import React, { FC, ReactElement } from 'react';
import { OpenFormatProvider } from '../src/provider';

export function address(addr: string) {
  return ethers.utils.getAddress(addr);
}

// @dev Testing requires a local ethereum node and subgraph to be running. These addresses are
// used in the tests.

// @todo setup Jest so a single utilities.tsx can be shared between all packages.

export const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
export const WALLET_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
export const WALLET_ADDRESS2 = address(
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
);
export const WALLET_ADDRESS3 = '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc';
export const APP_ID = '0x1ade2613adb6bafbc65d40eb9c1effbe3bfd8b81';
export const ERC721_CONTRACT_ADDRESS =
  '0x93998942b6a740da71faea1c4781965a5138b9aa';
export const ERC721_CONTRACT_NAME = 'My collectionss';
export const ERC20_CONTRACT_ADDRESS =
  '0xde0ae9668f59e02f599d38e9cf2ff3b3d75a79e2';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export function generateRandomString(length: number): string {
  return Math.random().toString(20).substring(2, length);
}

const signer = new ethers.Wallet(
  PRIVATE_KEY,
  new ethers.providers.JsonRpcProvider('http://localhost:8545')
);

const App: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OpenFormatProvider
      config={{
        network: 'localhost',
        appId: APP_ID,
        signer,
      }}
    >
      {children}
    </OpenFormatProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: App, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
