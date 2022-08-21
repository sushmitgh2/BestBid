import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo/logo_dark.png'
import logo2x from '../../assets/images/logo/logo_dark@2x.png'

const FooterStyle2 = () => {
    const [dataSocial] = useState([
    ])

    const [dataLinkMarket] = useState([
    ])


    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", toggleVisibility);
  
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
  return (
      <div>
            
            <div className="bottom">
                <div className="container">
                    <div className="bottom-inner">
                        Copyright © BestBid.
                    </div>
                </div>
            </div>
            {
                isVisible && 
                <Link onClick={scrollToTop}  to='#' id="scroll-top"></Link>
            }
      </div>
  );
};

export default FooterStyle2;
