import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const App = () => {

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("💯 Address:", address);

  const editionDrop = useEditionDrop("0xd844F24e6916C3cc569FaAE9FfD2aD9e9bCCe772")
  // Initialize our editionDrop contract
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // State variable for us to know if user has our NFT.
  const [isClaiming, setIsClaiming] = useState(false);
  // isClaiming keeps a loading state while the NFT is minting.


  useEffect(() => {
    if (!address){
      return;
    }

    const checkBalance = async() => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)){
          setHasClaimedNFT(true);
          console.log("🙌🏽 This user has a membership NFT.");
        } else {
          setHasClaimedNFT(false);
          console.log("🍅 This user doesn't have a membership NFT...");
        }
      } catch (error){
        setHasClaimedNFT(false);
        console.log("Failed to get balance", error);
    }
  };
  checkBalance();
}, [address, editionDrop]);

const mintNft = async () => {
  try {
    setIsClaiming(true);
    await editionDrop.claim("0", 1);
    console.log(`Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
    setHasClaimedNFT(true);
  } catch (error){
    setHasClaimedNFT(false);
    console.error("Failed to mint NFT", error);
  } finally {
    setIsClaiming(false);
  }
};

  if (!address){
    // if user has not connected wallet - this will render on the screen
    return (
      <div className="landing">
        <h1>Welcome to UpCyDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">Connect Your Wallet</button>
</div>    
    );
  }

  // if the user has minted the token - this will render 
  if (hasClaimedNFT){
    return (
      <div className='member-page'>
        <h1>UpCyDAO Member Page</h1>
        <p>🎊 Congrats on being a member 🎊</p>
      </div>
    )
  }

 
  // if user has connected their wallet - this will render on the screen 

  return (

    <div className='mint-nft'>
      <h2>🌊 Mint your free UpCyDAO Membership NFT</h2>
      <button
      disabled={isClaiming}
      onClick={mintNft}
      >
        {isClaiming ? "Minting..." : "Mint your NFT (for FREE.99 😘)"}
      </button>
    </div>
  );
};

export default App;
