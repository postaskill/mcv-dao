import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0xeEe746dcE397378567039d845740D9bf28Fb399D");

(async () => {
    try {
        // max token supply
        const amount = 1_000_000;
        // interact with the deployed ERC-20 contract and mint the tokens
        await token.mintToSelf(amount);
        const totalSupply = await token.totalSupply();

        // printing to the console how many tokens now exist
        console.log("💸 There are now ", totalSupply.displayValue, "$UPCY in circulation");  
    } catch (error){
        console.error("😿 Failed to print money", error);  
    }
})();

 