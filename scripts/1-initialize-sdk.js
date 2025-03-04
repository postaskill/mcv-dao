import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

import dotenv from "dotenv";
dotenv.config();


if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === ""){
    console.log("Private key was not found.");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === ""){
    console.log("Alchemy API URL was not found.");
}

if (!process.env.WALLET_ADDRESS || process.env.ALCHEMY_API_URL === ""){
    console.log("Wallet Address was not found.");
}

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const sdk = new ThirdwebSDK(wallet);

(async () => {
    try {
        const address = await sdk.getSigner().getAddress();
        console.log("SDK initialized by address:", address)
    } catch (err){
        console.error("Failed to get apps from the sdk.", err);
        process.exit(1);
    }
})();

export default sdk;