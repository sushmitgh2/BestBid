import React from 'react';
import { useState, useEffect } from 'react';
import img from '../../../assets/images/background/img-create-item.jpg'
import { File, getFilesFromPath } from 'web3.storage'
import { Web3Storage } from 'web3.storage';
import { ethers } from 'ethers';
import bestBidJson from '../../../build/BestBid.json';
import bestBidNFTJson from '../../../build/BestBidNFT.json';
import { sequence } from '0xsequence';
import { NFTStorage } from 'nft.storage';

const walletAppURL = 'https://sequence.app';
const network = 80001;
sequence.initWallet(network, { walletAppURL });

const Create = () => {

    const NFT_STORAGE_TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ4ZWY0RGY5ZDhFNjY1MWEwNTFBMzQxYjRGNDMzM0ZERWRmNjIyOTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTE1OTAxNTA5NiwibmFtZSI6IkJlc3RCaWQifQ.ibUMGQjFnySLmfPSNihi7HuEuUHBn_lGvs5a1dJTp-k";
    const BestBidCoreAddress = "0x2f91C03e4100c724ed1443eBf61515BdaF4Ded36";
    const BestBidNFTAddress = "0x918044E27E7A509FF20C457336cfcDbFd542404c";


    const [itemName, setItemName] = useState("");
    const [minBid, setMinBid] = useState(0);
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("Upload your Image");
    const [account, setAccount] = useState();
    const [cid, setCid] = useState("");

    const {ethereum} = window;

    var bestBidCore, bestBidNFT;

    useEffect(() => {
        
        async function load() {
          if(window.ethereum) {
            //await window.ethereum.enable();

            /*const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            console.log(signer);*/
            const wallet = sequence.getWallet();
            const signer = wallet.getSigner();

            bestBidCore = new ethers.Contract(BestBidCoreAddress, bestBidJson.abi, signer);

            bestBidNFT = new ethers.Contract(BestBidNFTAddress, bestBidNFTJson.abi, signer);
            
            /*const accounts = await ethereum.request({method: 'eth_accounts'});
            
            if(accounts.length !== 0) {
                var account = accounts[0];
                setAccount(account);
                console.log("Account: " + account)
            }*/

            getAccounts();
            
          }
        }

        async function loadData() {

        }

        load();
    }, []);

    const getAccounts = async () => {
        const wallet = sequence.getWallet()
    
        console.log('getAddress():', await wallet.getAddress())

        setAccount(wallet.getAddress());
    
        const provider = wallet.getProvider()
        console.log('accounts:', await provider.listAccounts())
    }

    /*useEffect(() => {
        
        async function load() {
          if(window.ethereum) {
            await window.ethereum.enable();

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            console.log(signer);

            bestBidCore = new ethers.Contract(BestBidCoreAddress, bestBidJson.abi, signer);

            bestBidNFT = new ethers.Contract(BestBidNFTAddress, bestBidNFTJson.abi, signer);
            
            const accounts = await ethereum.request({method: 'eth_accounts'});
            
            if(accounts.length !== 0) {
                var account = accounts[0];
                setAccount(account);
                console.log("Account: " + account)
            }
            
          }
        }
        
        load();
    }, []);*/

    async function storeFilesAndMint (e) {
        e.preventDefault();

        console.log(file);

        const nftstorage = new NFTStorage({token: NFT_STORAGE_TOKEN});
        const data = await nftstorage.store({
            image: file, 
            name: itemName, 
            description: desc
        })

        const cid = data.ipnft;

        console.log('stored files with cid:', cid)
        setCid(cid);

        const wallet = sequence.getWallet()
        const signer = wallet.getSigner();

        const tx = {
            to: BestBidCoreAddress,
            from: wallet.getAddress(),
            data: new ethers.utils.Interface(bestBidJson.abi).encodeFunctionData('createToken', [itemName, cid])
        }

        console.log("Minting token. Please wait...");
        const txnResp = await signer.sendTransaction(tx);
        console.log(txnResp);

        await txnResp.wait();
        console.log(txnResp.receipt);

        //const tokenID = parseInt(txnResp.receipt['logs'][0]['topics'][3], 16);

        //alert("You token has been created with Token Id = " + tokenID);

        alert("You will be requested to create a listing now");

        const txAuc = {
            to: BestBidCoreAddress,
            from: wallet.getAddress(),
            data: new ethers.utils.Interface(bestBidJson.abi).encodeFunctionData('createAuction', [itemName+" Auction", desc, 9])
        }

        const txnAucResp = await signer.sendTransaction(txAuc);
        console.log(txnAucResp);

        await txnAucResp.wait();

        console.log(txnAucResp.receipt);

        /*let mintTxn = await bestBidCore.createToken(itemName, cid);

        
        const txnReceipt = await mintTxn.wait();

        console.log(txnReceipt);

        const tokenID = parseInt(txnReceipt['logs'][0]['topics'][3], 16);
        console.log(tokenID);
        console.log(mintTxn.hash);

        alert("You token has been created with Token Id = " + tokenID);

        alert("You will be requested to create a listing now");

        let listTxn = await bestBidCore.createAuction(itemName + " Auction", desc, tokenID);

        console.log("Listing token. Please wait...");
        const listTxnReceipt = await listTxn.wait();

        console.log(listTxnReceipt);

        const auctionID = parseInt(listTxnReceipt['logs'][0]['topics'][3], 16);
        console.log(auctionID);
        console.log(listTxn.hash);

        alert("You auction has been created with Auction Id = " + auctionID);*/
    }

    return (
        <section className="tf-section create-item pd-top-0 mg-t-40">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-create-item-content">
                            <div className="form-create-item">
                                <div className="sc-heading">
                                    <h3>Create Item</h3>
                                </div>
                                <form id="create-item-1" action="#" method="GET" acceptCharset="utf-8">
                                    <label className="uploadFile">
                                        <span className="filename">{fileName}</span>
                                        <input type="file" className="inputfile form-control" name="file" onChange={(event) => {
                                            setFile(event.target.files[0]);
                                            setFileName(event.target.files[0].name);
                                        }}/>
                                        <span className="icon"><i className="far fa-cloud-upload"></i></span>
                                    </label>
                                    <div className="input-group">
                                        <input name="name" type="text" placeholder="Item Name" required onChange={(event) => {setItemName(event.target.value)}} />
                                        <input name="number" type="text" placeholder="Item Minimum Price" onChange={(event) => {setMinBid(event.target.value)}}
                                            required />
                                    </div>
                                
                                    <textarea id="comment-message" name="message" tabIndex="4"
                                        placeholder="Description" aria-required="true" onChange={(event) => {setDesc(event.target.value)}} ></textarea>
                                    <div className="input-group style-2 ">
                                    
                                    </div>
                                    <button name="submit" type="submit" id="submit" onClick={storeFilesAndMint}
                                        className="sc-button style letter style-2"><span>Create Item</span> </button>
                                </form>
                            </div>
                            <div className="form-background">
                                <img src={img} alt="BestBid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
};

export default Create;
