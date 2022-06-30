import sdk from './1-initialize-sdk.js';

// initializing the address of the ERC-1155 membership NFT contract
const editionDrop = sdk.getEditionDrop("0xd844F24e6916C3cc569FaAE9FfD2aD9e9bCCe772");

// initializing the address of the ERC-20 token contract 
const token = sdk.getToken("0xeEe746dcE397378567039d845740D9bf28Fb399D");

(async () => {
    try {
        // getting the addresses of DAO members holding the tokenId(0)
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddresses.length === 0){
            console.log(
                "No NFTs have been claimed yet, get some folks to claim some for free!",
            );
            process.exit(0);
        }

    // Looping through the array of addresses
    const airdropTargets = walletAddresses.map((address) => {
        // picking a random # between 1000 and 10000
        const randomAmount = Math.floor(Math.random() * (10000 - 1000 +1) + 1000);
        console.log("✈ Going to airdrop", randomAmount, "tokens to", address);  

        // setting up the target for the drop
        const airdropTarget = {
            toAddress: address,
            amount: randomAmount,
        };
        return airdropTarget;
    });

    // calling transferBatch on all airdrop targets
    console.log("Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("🖼 Successfully airdropped tokens to all membership NFT holders!");
} catch (err){
    console.log("😿 Failed to airdrop tokens.", err);
}
})();


