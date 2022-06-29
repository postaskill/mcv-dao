import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xd844F24e6916C3cc569FaAE9FfD2aD9e9bCCe772");

(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "UpCy Bot",
                description: "this NFT will give you access to UpCyDAO",
                image: readFileSync("scripts/assets/upcy.png"),
            },
        ]);
        console.log("Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("Failed to create the new NFT.", error);
    }
})();