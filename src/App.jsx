import { useAddress, useMetamask, useEditionDrop, useToken } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("💯 Address:", address);

  const editionDrop = useEditionDrop("0xd844F24e6916C3cc569FaAE9FfD2aD9e9bCCe772");
  // Initialize our editionDrop contract

  const token = useToken("0xeEe746dcE397378567039d845740D9bf28Fb399D");


  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // State variable for us to know if user has our NFT.
  const [isClaiming, setIsClaiming] = useState(false);
  // isClaiming keeps a loading state while the NFT is minting.


  // the state of the amount of tokens each member has
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);

  // array containing the addresses of all members
  const [memberAddresses, setMemberAddresses] = useState([]);

  // JavaScript .substring() method to shorten the wallet address for privacy
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length -4);
  };

  // returns all members holding the NFT !hasClaimedNFT??? 
  useEffect(() => {
    if (!hasClaimedNFT){
      return;
    }

    const getAllAddresses = async () => {
      try {
        // references all the members who hold the NFT with the tokenId of 0
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses);
        console.log("⚓ Members addresses", memberAddresses);
      } catch (error){
        console.error("🙀 Failed to get member list", error);
      }
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop.history]);

  // grabbing the number of tokens each member holds with the useEffect hook
  useEffect(() => {
    if (!hasClaimedNFT){
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("💰 Amounts", amounts);
      } catch (error) {
        console.error("😿 Failed to get member balances", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token.history]);


  // combining the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      // checking if the address is in the memberTokenAmounts array
      // if so, returning the amount of tokens the user has
      // otherwise, returning 0
      const member = memberTokenAmounts?.find(({ holder }) => holder === address);

      return {
        address, 
        tokenAmount: member?.balance.displayValue || "0"
      }
    });
  }, [memberAddresses, memberTokenAmounts]);


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
        <div>
          <div>
            <h2>Member List</h2>
            <table className='card'>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                  </tr>
                  </thead>
                  <tbody>{memberList.map((member) => {
                    return (
                      <tr key ={member.address}>
                        <td>{shortenAddress(member.address)}</td>
                        <td>{member.tokenAmount}</td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table> 
            </div>
        </div>
      </div>
    );
  };
 
 
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
