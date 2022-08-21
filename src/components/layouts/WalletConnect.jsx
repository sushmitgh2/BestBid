import React , { useState } from 'react';
import { Link } from 'react-router-dom'

const WalletConnect = () => {
    const [data] = useState(
        [
           
          
            
        ]
    )
return (
    <section className="tf-section connect-wallet">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="sc-heading">
                        <h3>Wallet - Connect</h3>
                    </div>
                </div>
                {
                    data.map((item,index)=> (
                        <div key={index} className="col-lg-4 col-md-4">
                            <div className={`sc-wallet ${item.class}`}>
                                <div className="icon">
                                    <img src={item.img} alt="Bidzen" />
                                </div>
                                <div className="content">
                                    <h4><Link to="/login">{item.title}</Link></h4>
                                    <p>{item.text}</p>
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

export default WalletConnect;
