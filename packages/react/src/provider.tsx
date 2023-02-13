import { OpenFormatSDK, SDKOptions } from '@openformat/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { Connector, useConnect, useSigner, WagmiConfig } from 'wagmi';
import { wagmiClient } from './wagmi-client';

const OpenFormatContext = createContext<{ sdk: OpenFormatSDK } | undefined>(
  undefined
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/**
 * The Provider for the Open Format SDK
 */
export function OpenFormatProvider({
  children,
  config = {
    network: 'localhost',
    appId: '',
  },
}: {
  children: React.ReactNode;
  config?: SDKOptions;
}) {
  return (
    <WagmiConfig client={wagmiClient}>
      <InnerProvider config={config}>{children}</InnerProvider>
    </WagmiConfig>
  );
}

function InnerProvider({
  children,
  config = {
    network: 'localhost',
    appId: '',
  },
}: {
  children: React.ReactNode;
  config?: SDKOptions;
}) {
  const { connect, connectors } = useConnect();
  const { data: signer } = useSigner();
  const sdk = useMemo(
    () =>
      new OpenFormatSDK({
        signer,
        ...config,
      }),
    [signer]
  );

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem('wagmi.wallet') ?? '""');
    const previouslyConnected = JSON.parse(
      localStorage.getItem('wagmi.connected') ?? 'false'
    );

    const connector = connectors.find(
      (connector: Connector) => wallet === connector.id
    );

    if (wallet && previouslyConnected) {
      connect({ connector });
    }
  }, []);

  return (
    <OpenFormatContext.Provider value={{ sdk: sdk }}>
      <ConnectKitProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConnectKitProvider>
    </OpenFormatContext.Provider>
  );
}

/**
 * Gets the Open Format Context
 * @returns the open format context
 * @private
 */
export function useOpenFormat() {
  const context = useContext(OpenFormatContext);

  if (typeof context === 'undefined') {
    throw new Error('<OpenFormatProvider> is not wrapping your app');
  }

  return context;
}
