import { OpenFormatSDK } from "@openformat/sdk";
import { ethers } from "ethers";

const sdk = new OpenFormatSDK({
  signer: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
});

// Deploy Proxy
const app = await sdk.getApp("0x");
const mint = await app.ERC20.mint();

console.log({ mint });
// // Get Proxy
// const app = sdk.getApp(appId | process.env.APP_ID);
// // ERC20
// const ERC20 = app.ERC20;
// await ERC20.mint();
// await ERC20.deploy();
// await ERC20.burn();
// await ERC20.transfer();
// // ERC721
// const ERC721 = app.ERC721;
// await ERC721.mint();
// await ERC721.deploy();
// await ERC721.transfer();
// // Marketplace
// const marketplace = app.Marketplace;

// await marketplace.createListing();
// await marketplace.updateListing();
// await marketplace.cancelListing();
// await marketplace.buyListing();
// // Loyalty
// const loyalty = app.Loyalty;
// await loyalty.createToken();
// await loyalty.earn();
// await loyalty.redeem();
// await loyalty.createPoints();
// await loyalty.deletePoints();
