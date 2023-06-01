import { ConnectKitButton } from 'connectkit';

interface Props {
  labels?: {
    disconnected: string;
  };
  className?: string;
  style?: React.CSSProperties;
}

export function ConnectButton({
  labels = {
    disconnected: 'Connect Wallet',
  },
  className,
  style,
  ...props
}: Props) {
  const custom = className || style;

  return custom ? (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button onClick={show} className={className} style={style} {...props}>
            {isConnected ? ensName ?? truncatedAddress : labels.disconnected}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  ) : (
    <ConnectKitButton />
  );
}
