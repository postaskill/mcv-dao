import sdk from './1-initialize-sdk.js';

const token = sdk.getToken("0xeEe746dcE397378567039d845740D9bf28Fb399D");

(async () => {
    try {
        // initializing and logging the current roles
        const allRoles = await token.roles.getAll();

        console.log("Current Roles: ", allRoles);

        // revoking the admin rights of creator on ERC-20 contract
        await token.roles.setAll({ admin: [], minter: [] });
        console.log(
            "🔒 Roles after revoking DAO creator", 
            await token.roles.getAll() 
        );
        console.log("✔ Successfully revoked admin rights from the ERC-20 contract" );
    } catch (error){
        console.error("Failed to revoke admin rights from the DAO treasury.", error);
    };
})();

