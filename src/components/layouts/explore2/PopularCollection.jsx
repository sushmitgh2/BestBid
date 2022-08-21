import React , {useState} from 'react';
import { Link } from 'react-router-dom'
import Countdown from "react-countdown";

const PopularCollection = props => {
    const data = props.data;

    const [visible] = useState(12);
    
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
                                            <div className="avatar">
                                                <img src={item.imgAuthor} alt="Bidzen" />
                                            </div>
                                            <div className="infor">
                                                <div className="author-name"><Link to="/authors">{item.name}</Link></div>
                                                <span>Creator</span>
                                            </div>
                                        </div>
                                         </div>
                                         <div className="countdown">
                <Countdown date={Date.now() + 500000000}>
                </Countdown>
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
