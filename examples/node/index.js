const { OpenFormatSDK, toWei, Chains } = require("@openformat/sdk");
const { gql } = require("graphql-request");

// Visit https://apps.openformat.tech/ to generate App on Polygon Mumbai.
const APP_ID = "INSERT_APP_ID";

const sdk = new OpenFormatSDK({
  network: Chains.polygonMumbai,
  appId: APP_ID,
  signer: "INSERT_PRIVATE_KEY",
});

(async () => {
  try {
    // We first create a fungible (ERC20) token
    // contract and mints 1000 tokens.
    console.log("creating token...");

    const token = await sdk.App.createToken({
      name: "My First Token",
      symbol: "MFT",
      supply: toWei("1000"),
    });

    console.log(
      `Token created - https://mumbai.polygonscan.com/address/${token.address()}`
    );

    // Now we mint 1000 fungible tokens from
    // the token contract we just created.
    console.log("Minting 1000 tokens...");

    await token.mint({
      to: "0x03755352654D73DA06756077Dd7f040ADcE3Fd58",
      amount: toWei("1000"),
    });
    console.log("Tokens minted...");

    // Lastly, we fetch blockchain data via our subgraph.
    // See - https://api.thegraph.com/subgraphs/name/open-format/mumbai
    const query = gql`
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
    `;

    const subgraphData = await sdk.subgraph.rawRequest(query, {
      appId: APP_ID,
    });

    console.log(JSON.stringify(subgraphData, null, 2));
  } catch (e) {
    console.log({ e });
  }
})();
