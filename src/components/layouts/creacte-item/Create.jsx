import React from 'react';
import { useState, useEffect } from 'react';
import img from '../../../assets/images/background/img-create-item.jpg'
import { File, getFilesFromPath } from 'web3.storage'
import { Web3Storage } from 'web3.storage';
import { ethers } from 'ethers';


const Create = () => {

    const WEB3STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg4Q0ZDNDAwQkRFMDMyRUZjRDE1OEVDQkFDMEJmNzBCQTY5ZUZiYjQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwODU4NjE5ODYsIm5hbWUiOiJCZXN0QmlkIn0.ykzR2IHWZWAzRRlhghTCQNRYqZMTgJRdz35k6yZcK3k";

    const [itemName, setItemName] = useState("");
    const [minBid, setMinBid] = useState(0);
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState();
    const [account, setAccount] = useState();

    const {ethereum} = window;

    useEffect(() => {
        
        async function load() {
          if(window.ethereum) {
            await window.ethereum.enable();

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            console.log(signer);
            
            const accounts = await ethereum.request({method: 'eth_accounts'});
            
            if(accounts.length !== 0) {
                var account = accounts[0];
                setAccount(account);
                console.log("Account: " + account)
            }
            
          }
        }
        
        load();
    }, []);

    function handleClick(e) {
        e.preventDefault();
        
        console.log(file);
        //storeWithProgress(file);
        storeFiles(file);
    } 

    function getAccessToken () {
        return WEB3STORAGE_TOKEN
    }
    
    function makeStorageClient () {
        return new Web3Storage({ token: getAccessToken() })
    }

    async function storeFiles (files) {
        const client = makeStorageClient()
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        return cid
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
                                        <span className="filename">Choose Item</span>
                                        <input type="file" className="inputfile form-control" name="file" onChange={(event) => {setFile(event.target.files[0])}}/>
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
                                    <button name="submit" type="submit" id="submit" onClick={handleClick}
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
