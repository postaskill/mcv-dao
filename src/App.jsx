import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const App = () => {

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("💯 Address:", address);

    // Initialize our editionDrop contract
  const editionDrop = useEditionDrop("0xd844F24e6916C3cc569FaAE9FfD2aD9e9bCCe772")
  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  useEffect(() => {
    if (!address){
      return;
    }

    const checkBalance = async() => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)){
          setHasClaimedNFT(true);
          console.log("🌚 This user has a membership NFT.");
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

  if (!address){
    return (
      <div className="landing">
        <h1>Welcome to UpCyDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">Connect Your Wallet</button>
</div>    
    );
  }

  return (
    <div className="landing">
      <h1>🔗 Your Wallet is Connected...</h1>
    </div>
  );
};

export default App;
