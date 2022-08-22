import { sequence } from '0xsequence';
import { ethers } from 'ethers';
import React , { useState } from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { Web3Storage } from 'web3.storage'

import bestBidJson from '../../build/BestBid.json';
import bestBidNFTJson from '../../build/BestBidNFT.json';
import verifierJson from '../../build/Verifier.json';

const walletAppURL = 'https://sequence.app';
const network = 80001;
sequence.initWallet(network, { walletAppURL });

const WalletConnect = () => {
    const [bidAmt, setBidAmt] = useState();
    const [account, setAccount] = useState();
    const [verifier, setVerifier] = useState();
    const [bestBidCore, setBestBidCore] = useState();
    const [auctionId, setAuctionId] = useState();

    const verifierAddress = "0x7ea90D060dbc1D8f913F9badd35dba5184649e06";
    const BestBidCoreAddress = "0x2f91C03e4100c724ed1443eBf61515BdaF4Ded36";
    const BestBidNFTAddress = "0x918044E27E7A509FF20C457336cfcDbFd542404c";

    const WEB3STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg4Q0ZDNDAwQkRFMDMyRUZjRDE1OEVDQkFDMEJmNzBCQTY5ZUZiYjQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwODU4NjE5ODYsIm5hbWUiOiJCZXN0QmlkIn0.ykzR2IHWZWAzRRlhghTCQNRYqZMTgJRdz35k6yZcK3k";

    var bestBidNFT;

    const args1 =  ["0x0f7031ad455c7a53af18832ba89f524689fe25f5380c3c759637da3caeccb4b3", "0x2a2dba06322a4d5f985c589e3e30269dce411dd4ae725c4b1da9e2c1daabe87f"];
    const args2 = [["0x096604f64662a6ed71aa823b4f978d794518901033877d0e7d0f5debdb085e48", "0x2ac7eef01a7dc8676b2b0048c7bba49d26889e6c650d31fc86ad2179037290a5"],["0x04c0686b7bfe08cfaabb76b22ad1afc0532a01a7e19c67f3a6c0f9b92df9e552", "0x0b16c756b0628e12740379666d656f804082635e7b91cfd15e858db7b055f9ce"]];
    const args3 = ["0x07a01327c81f1bcf6f35d82ba77a59fff3cce277b1cab3f09c646280e7a4f62c", "0x0a304bfdf16c96c6852874ddd058474cad5d369dcbbc430ffdd680af274a7763"];
    const args4 = ["0x0000000000000000000000000000000000000000000000000000000000000001"];

    useEffect(() => {
        
        async function load() {

            const wallet = sequence.getWallet();

            if(!wallet.isConnected())
                await wallet.connect({app: "BestBid"});

            const signer = wallet.getSigner();

            bestBidNFT = new ethers.Contract(BestBidNFTAddress, bestBidNFTJson.abi, signer);

            setVerifier(new ethers.Contract(verifierAddress, verifierJson.abi, signer));
            setBestBidCore(new ethers.Contract(BestBidCoreAddress, bestBidJson.abi, signer));

        }

        const getAccounts = async () => {
            const wallet = sequence.getWallet()
        
            console.log('getAddress():', await wallet.getAddress())
    
            setAccount(await wallet.getAddress());
        
            const provider = wallet.getProvider()
            console.log('accounts:', await provider.listAccounts())
        }


        load();
        getAccounts();
    }, []);

    function getAccessToken () {
        return WEB3STORAGE_TOKEN;
    }
      
    function makeStorageClient () {
        return new Web3Storage({ token: getAccessToken() })
    }

    async function uploadBidDetails() {
        const wallet = sequence.getWallet();

        const obj = { 
            bidder: await wallet.getAddress(),
            auctionId: 2,
            bidAmt: bidAmt+" MATIC",
         }
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

        const files = [
            new File([blob], "bidDetails"+account+Date.now()+".txt")
        ];

        const client = makeStorageClient()
        const cid = await client.put(files)
        console.log('Bid stored securely with cid:', cid);
        alert('Bid stored securely with cid: '+ cid);

        return cid;
    }

    const handleClick = async (e) => {
        e.preventDefault();

        const wallet = sequence.getWallet();

        const signer = wallet.getSigner();

        console.log(account);

        console.log(verifier);
        const verified = await verifier.verifyProof(args1, args2, args3, args4);
     
        if(verified) {
            alert("User has successfully verified using Zero Knowledge Proof");

            const cid = await uploadBidDetails();

            const bid = ethers.utils.parseUnits(bidAmt.toString(), "ether");;
            console.log(bid);

            const tx = {
                to: BestBidCoreAddress,
                from: wallet.getAddress(),
                data: new ethers.utils.Interface(bestBidJson.abi).encodeFunctionData('bidOnAuction', [2, cid]),
                value: bid
            };
    
            const txnResp = await signer.sendTransaction(tx);
            console.log(txnResp);
            await txnResp.wait();
        }else{
            alert("Invalid Proof");
        }
    }
return (
    <section className="tf-section connect-wallet">
        <div className="container">
            <center><h3>Place Bid</h3></center><br></br>
            <form id="create-item-1" action="#" method="GET" acceptCharset="utf-8">
                                    
                                    <div className="input-group">
                                        <input name="number" type="text" placeholder="Bid Amount"
                                            required onChange={(event) => {setBidAmt(event.target.value)}} />
                                    </div>
                                
                                    
                                    <div className="input-group style-2 ">
                                    
                                    </div>
                                    <button name="submit" onClick={handleClick} id="submit"
                                        className="sc-button style letter style-2"><span>Place Bid</span> </button>
                                </form>
        </div><br></br><br></br><br></br><br></br>
    </section>
    );
};

export default WalletConnect;
