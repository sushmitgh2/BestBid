import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
    const [dataSocial] = useState([
       
    ])

    const [dataLinkMarket] = useState([
    ])

    const [dataSupport] = useState([
      
    ])

    const [dataRecent] = useState([
       
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

export default Footer;
