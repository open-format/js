import {
  ERC20Base,
  fromWei,
  toWei,
  useContract,
  useMintToken,
  useOpenFormat,
  useRawRequest,
  useWallet,
} from "@openformat/react";
import { gql } from "graphql-request";

type Metadata = {
  name: string;
  symbol: string;
  totalSupply: string;
};

type Contract = {
  id: string;
  type: string;
  metadata: Metadata;
};

type SubgraphData = {
  contracts: Contract[];
};

const Home = () => {
  const { address } = useWallet();
  const { sdk } = useOpenFormat();
  // Once you've created your token, it will appear in the Created Tokens table.
  const { data: token } = useContract("INSERT_CREATED_TOKEN_CONTRACT_ADDRESS");

  // All our hooks use `react-query` under the hood.
  const { mint, isLoading: isMinting } = useMintToken(token as ERC20Base);

  // This hook fetches blockchain data via our subgraph. See - https://api.thegraph.com/subgraphs/name/open-format/mumbai
  const { data: subgraphData, isLoading: loadingContracts } = useRawRequest<
    SubgraphData,
    any
  >({
    query: gql`
      query contractByAppId($appId: String!) {
        contracts(where: { app_contains_nocase: $appId }) {
          id
          type
          metadata {
            name
            symbol
            totalSupply
          }
        }
      }
    `,
    variables: {
      appId: process.env.NEXT_PUBLIC_APP_ID,
    },
    config: {
      refetchInterval: 2000,
    },
  });

  // This function create a fungible (ERC20) token
  // contract and mints 1000 tokens.
  async function handleCreateToken() {
    try {
      if (address) {
        await sdk.App.createToken({
          name: "My First Token",
          symbol: "MFT",
          supply: toWei("1000"),
        });
      }
    } catch (error) {
      console.log("handleDeploy", error);
    }
  }

  // This function mints 1000 fungible tokens from
  // the token contract used in the useContract hook
  async function handleMint() {
    try {
      if (token && address) {
        mint({ to: address, amount: toWei("1000") });
      }
    } catch (error) {
      console.log("handleDeploy", error);
    }
  }

  if (loadingContracts) return "Loading created contracts...";

  return (
    <div>
      {address && (
        <div>
          <button onClick={handleCreateToken}>
            Create Fungible Token Contract
          </button>
          <button onClick={handleMint}>
            {isMinting ? "Minting..." : "Mint 1000 tokens"}{" "}
          </button>
        </div>
      )}

      <h1>Created Tokens</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Total Supply</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {subgraphData &&
            subgraphData.contracts.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.metadata.name}</td>
                <td>{contract.id}</td>
                <td>{fromWei(contract.metadata.totalSupply)}</td>
                <td>{contract.type}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
