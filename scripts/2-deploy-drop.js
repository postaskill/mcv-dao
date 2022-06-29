import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            name: "UpCyDAO Membership",
            description: "A DAO for upcycling enthusiasts.",
            image: readFileSync("scripts/assets/UpCyDAO.png"),
            primary_sale_recipient: AddressZero,
        });
        const editionDrop = sdk.getEditionDrop(editionDropAddress);
        const metadata = await editionDrop.metadata.get();

        console.log("Successfully deployed editionDrop contract, address:", editionDropAddress);

        console.log("Successfully deployed editionDrop metadata:", metadata);
    } catch (error){
        console.log("Failed to deploy editionDrop contract.", error);
    }
})();