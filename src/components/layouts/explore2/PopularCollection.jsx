import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Countdown from "react-countdown";
import { sequence } from '0xsequence';
import { ethers } from 'ethers';

import bestBidJson from '../../../build/BestBid.json';
import bestBidNFTJson from '../../../build/BestBidNFT.json';

const walletAppURL = 'https://sequence.app';
const network = 80001;
sequence.initWallet(network, { walletAppURL });

const PopularCollection = props => {
    const [data, setData] = useState([]);
    const [account, setAccount] = useState();

    const [visible] = useState(12);

    const BestBidCoreAddress = "0x2f91C03e4100c724ed1443eBf61515BdaF4Ded36";
    const BestBidNFTAddress = "0x918044E27E7A509FF20C457336cfcDbFd542404c";

    var bestBidCore, bestBidNFT;

    useEffect(() => {
        
        async function load() {
            const wallet = sequence.getWallet();

            if(!wallet.isConnected())
                await wallet.connect({app: "BestBid"});

            const signer = wallet.getSigner();

            bestBidCore = new ethers.Contract(BestBidCoreAddress, bestBidJson.abi, signer);

            bestBidNFT = new ethers.Contract(BestBidNFTAddress, bestBidNFTJson.abi, signer);

            getAccounts();
            loadData();
        }

        async function loadData() {
            setData([]);
            var i;

            for(i = 0; i<10; i++) {
                var ftauction1 = await bestBidCore.getAuction(i)
                var f1auction1creator = await bestBidCore.getAuctionCreator(i);

                var str_add1 = f1auction1creator.substring(0, 8) +"..."+f1auction1creator.substring(34, 42)

                setData(data => [...data, {
                    img: "https://"+ftauction1[2]+".ipfs.nftstorage.link/",
                    title: ftauction1[0],
                    imgAuthor: "",
                    name: str_add1,
                    price: 'Your choice',
                    auctionId: 2
                }
                ]);
            }
            
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
    
  return (
    <section className="tf-section trendy-colection-page style-2">
        <div className="container">
            <div className="row">
               
                {
                    data.slice(0,visible).map((item,index)=> (
                        <div key={index} className='col-lg-4 col-md-6 col-12'>
                            <div className="sc-product-item style-2">
                                    <div className="product-img">
                                        <img src={item.img} alt="Bidzen" />
                                        <Link to="/connect-wallet"
                                            className="sc-button style letter"><span>Place Bid</span></Link>
                                        
                                    </div>
                                    <div className="product-content">
                                        <h5 className="title"><Link to="/item-details">{item.title}</Link> </h5>
                                        <div className="product-author flex">
                                            <div className="infor">
                                                <div className="author-name"><Link to="/authors">{item.name}</Link></div>
                                                <span>Creator</span>
                                            </div>
                                        </div>
                                         </div>
                                         
                                </div>
                                
                        </div>
                    ))
                }
                
                
            </div>
        </div>
    </section>
    );
};

export default PopularCollection;
