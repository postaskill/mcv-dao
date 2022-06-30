import { AddressZero } from '@ethersproject/constants';
import sdk from './1-initialize-sdk.js';

(async () => {
    try {
        // deploying a standard ERC-20 contract
        const tokenAddress = await sdk.deployer.deployToken({
            // Giving the token a name 
            name: "UpCyDAO Governance Token",
            // Giving the token a symbol
            symbol: "UPCY",
            // because the token is not for sale, it's set to be received by AddressZero
            primary_sale_recipient: AddressZero,
        });
        console.log(
            "🍹 Successfully deployed token module, address:",
            tokenAddress,  
        );
    } catch (error) {
        console.error("😝 failed to deploy token module", error);
    }
})();