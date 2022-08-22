import React from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y , Grid } from 'swiper';
import Countdown from "react-countdown";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import { sequence } from '0xsequence'

import bestBidJson from '../../../build/BestBid.json';
import bestBidNFTJson from '../../../build/BestBidNFT.json';

import { ETHAuth, Proof } from '@0xsequence/ethauth'

const walletAppURL = 'https://sequence.app';
const network = 80001;
sequence.initWallet(network, { walletAppURL });

const LiveAution = props => {

    const [data, setData] = useState([]); 

    const [account, setAccount] = useState();

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
            const ftauction1 = await bestBidCore.getAuction(2)
            const f1auction1creator = await bestBidCore.getAuctionCreator(2);

            const ftauction2 = await bestBidCore.getAuction(3)
            const ftauction2creator = await bestBidCore.getAuctionCreator(3);
            
            var str_add1 = f1auction1creator.substring(0, 8) +"..."+f1auction1creator.substring(34, 42)
            var str_add2 = ftauction2creator.substring(0, 8) +"..."+ftauction2creator.substring(34, 42)
            
            console.log(ftauction1);
            console.log(ftauction2);

            setData([...data, {
                img: "https://bafkreibrrn2bbxotpb3j6ilzcbi3xtsaxs27p65arwzcuccjfoa6ofr5mu.ipfs.nftstorage.link/",
                title: ftauction1[0],
                imgAuthor: "",
                name: str_add1,
                price: 'Your choice',
                auctionId: 2
            }, {
                img: "https://bafkreibomzr2tmho35g4q344xwcmt5nddb7emucfohl6jfbrindrhfijvm.ipfs.nftstorage.link/",
                title: ftauction2[0],
                imgAuthor: "",
                name: str_add2,
                price: 'Your choice',
                auctionId: 3
            }
            ]);
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
    <section className="live-autions tf-section bg-body">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="sc-heading style-2 has-icon">
                        <div className="content-left">

                            <div className="inner">
                                <div className="group">
                                    <div className="icon"><i className="ripple"></i></div>
                                    <h3>Live Auctions</h3>
                                </div>
                                <p className="desc">Get started bidding by using your closed bid auction strategies. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="swiper-container live-auc style-2">
                        <div className="swiper-wrapper">
                        <Swiper
                        modules={[Navigation, Scrollbar, A11y  , Grid]}
                        spaceBetween={30}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                },
                            767: {
                                slidesPerView: 1,
                            },
                            991: {
                                slidesPerView: 2,
                            },
                            }}
                        slidespercolumn={2}
                        slidesPerGroup={2}
                        // slidesPerColumnFill= "row"
                      
                        navigation
                        scrollbar={{ draggable: true }}
                        >
                        {
                            data.map((item,index) => (
                                <SwiperSlide key={index}>
                                    <LiveAutionItem item={item} />
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

const LiveAutionItem = props => (
    <div className="sc-product-item style-7 flex">
    <div className="product-img">
        <img src={props.item.img} alt="BestBid" />
        <Link to="/place_bid" params={{id: props.item.auctionId}}
            className="sc-button style letter"><span>Place Bid</span></Link>
    </div>
    <div className="product-content">
        
        <h5 className="title"><Link to="/item-details">{props.item.title}</Link> </h5>
        <div className="product-author flex">
            
            <div className="infor">
                <div className="author-name"><Link to="/authors">{props.item.name}</Link></div>
                <span>Creator</span>
            </div>
        </div>
        <div className="product-price">
            <div className="title">Minimum Bid</div>
            <div className="price">
                <span>{props.item.price}</span>
            </div>
        </div>
    </div>
</div>
)

export default LiveAution;
