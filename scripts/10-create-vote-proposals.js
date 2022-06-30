import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// the governance contract 
const vote = sdk.getVote("0x813244Ca4AC13550F7411A5Cd40C29AF6Cb35BA5");

// the ERC-20 contract
const token = sdk.getToken("0xeEe746dcE397378567039d845740D9bf28Fb399D");

(async () => {
    // commented out the first proposal to redeploy the script after finding a typo in the second proposal function
/*     try {
        // creating proposal to mint 420,000 new tokens to the treasury
        const amount = 420_000;
        const description = "Should UpCyDAO mint an additional " + amount + "  tokens into the treasury?";
        const executions = [
            {
                // token contract that executes the mint
                toAddress: token.getAddress(),
                // the native token is ETH but none is being sent in this proposal
                nativeTokenValue: 0,
                // minting to the vote/voting contract that is acting as the treasury
                // using ethers.js to convert the amount into wei
                transactionData: token.encoder.encode(
                    "mintTo", [
                        vote.getAddress(),
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ), 
            }
        ];

        await vote.propose(description, executions);

        console.log("Successfully created a proposal to mint tokens");
    } catch (error){
        console.error("Failed to create first proposal.", error);
        process.exit(1);
    } */
    try {
        // creating a proposal to transfer 6,900 tokens for being amazing.
        const amount = 6_900;
        const description = "Should UpCyDAO transfer " + amount + " tokens from the treasury to " + process.env.WALLET_ADDRESS + " for being persistent?";
        const executions = [
            {
                // sending 0 ETH - only $UPCY
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    // Transferring from the treasury to my wallet
                    "transfer", 
                    [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ), 
                toAddress: token.getAddress(),
            },
        ];
        await vote.propose(description, executions);

        console.log(
            "Successfully created proposal to reward myself from the treasury, will see if others agree and give me a vote!",
        );
    } catch (error) {
        console.error("Failed to create a second proposal.", error);
    }
})();