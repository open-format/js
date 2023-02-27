import { render, RenderOptions } from '@testing-library/react';
import { ethers } from 'ethers';
import React, { FC, ReactElement } from 'react';
import { OpenFormatProvider } from '../src/provider';

const signer = new ethers.Wallet(
  '0x04c65fb1737cf9a5fb605b403b5027924309e53a3433d06029a0441cc03e2042',
  new ethers.providers.JsonRpcProvider(
    'https://matic-mainnet.chainstacklabs.com/'
  )
);

const App: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OpenFormatProvider
      config={{
        network: 'mumbai',
        appId: '0x05a3e6a34baffa74586a93f64b57cbd9a6383c23',
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
