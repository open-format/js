import { useMemo } from 'react';
import { Chain, configureChains, createClient } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

export function wagmiClient(acceptedChains: Chain[]) {
  const { chains, provider } = configureChains(
    [...acceptedChains],
    [publicProvider()]
  );

  const metamask = new MetaMaskConnector({ chains });

  const injected = new InjectedConnector({ chains });

  return useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors: [injected, metamask],
        provider,
      }),
    []
  );
}
