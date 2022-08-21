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
            <center><h3>Place Bid</h3></center><br></br>
            <center><p>Minimum Bid Amount: 2 MATIC</p></center><br></br>
            <form id="create-item-1" action="#" method="GET" acceptCharset="utf-8">
                                    
                                    <div className="input-group">
                                        <input name="number" type="text" placeholder="Bid Amount"
                                            required />
                                    </div>
                                
                                    
                                    <div className="input-group style-2 ">
                                    
                                    </div>
                                    <button name="submit" type="submit" id="submit"
                                        className="sc-button style letter style-2"><span>Place Bid</span> </button>
                                </form>
        </div><br></br><br></br><br></br><br></br>
    </section>
    );
};

export default WalletConnect;
