import React , {useState} from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Countdown from 'react-countdown';
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Footer from '../components/footer/Footer';

import img1 from '../assets/images/avatar/avt-6.jpg'
import img2 from '../assets/images/avatar/avt-2.jpg'
import img3 from '../assets/images/avatar/avt-4.jpg'
import imgdetail1 from '../assets/images/product-item/auction-detail.jpg'
import avt1 from '../assets/images/avatar/avt-4.jpg'
import avt2 from '../assets/images/avatar/avt-6.jpg'
import avt3 from '../assets/images/avatar/avt-3.jpg'

const ItemDetails = () => {
    const [dataHistory] = useState(
        [
            {
                img: img1,
                name:"@Johnson",
                time: "8 hours ago ",
                price: "25 ETH ",
            },
            {
                img: img2,
                name:"@Johnson",
                time: "8 hours ago ",
                price: "25 ETH ",
            },
            {
                img: img3,
                name:"@Johnson",
                time: "8 hours ago ",
                price: "25 ETH ",
            },
        ]
    )
  return <div className='item-details'>
        <Header />
        <section className="tf-section item-details-page">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <div className="item-media">
                                <div className="media">
                                    <img src={imgdetail1} alt="BestBid" />
                                </div>
                                <div className="countdown style-2">
                                    <Countdown  date={Date.now() + 500000000} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <div className="content-item">
                                <h3> 3D Space Rocket With Smoke</h3>
                                <p className="mg-bt-42">A Rocket is composed of three Component NFTs: a Nose Cone, a Body, and a Tail Assembly. A Nose Cone, a Body, and a Tail Assembly may be combined to form a Completed Rocket NFT. The Component NFTs are burned, and a Completed Rocket NFT is minted.</p>
                              
                                
                                <div className="author-bid">
                                    <div className="author-item">
                                        <div className="infor">
                                            <h6><Link to="/authors">Keith J. Kelley</Link> </h6>
                                            <div className="create">Creator</div>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className="infor-bid">
                                    <div className="content-left">
                                        <h6>Minimum Bid</h6>
                                        <div className="price">2 MATIC</div>
                                    </div>
                                   
                                </div>
                                <Link to="/connect-wallet"
                                    className="sc-button style letter style-2 style-item-details"><span>Place Bid</span>
                                </Link>
                                <div className="flat-tabs themesflat-tabs">
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        <Footer />
  </div>;
};

export default ItemDetails;
