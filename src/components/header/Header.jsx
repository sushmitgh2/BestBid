import React , { useRef , useState , useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo/logo_dark.png'
import logo2x from '../../assets/images/logo/logo_dark@2x.png'
import logolight from '../../assets/images/logo/logo.png'
import logolight2x from '../../assets/images/logo/logo@2x.png'
import menus from "../../pages/menu";
import DarkMode from "./DarkMode"

import { sequence } from '0xsequence';
import { ETHAuth, Proof } from '@0xsequence/ethauth'

import icon from '../../assets/images/icon/connect-wallet.svg'
import { Button } from 'react-bootstrap';

const walletAppURL = 'https://sequence.app';
const network = 'polygon';
sequence.initWallet(80001, { walletAppURL });

const Header = () => {

    const [buttonText, setButtonText] = useState("Connect Wallet");

    const { pathname } = useLocation();
    const headerRef = useRef (null)
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        
        scrollTop >= 100 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 120 ? header.classList.add('is-small') : header.classList.remove('is-small');
    };

    const menuLeft = useRef(null)
    const btnToggle = useRef(null)

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
        btnToggle.current.classList.toggle('active');
    }


    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = index => {
        setActiveIndex(index); 
    };

    
    const wallet = sequence.getWallet()

    const walletActions = async () => {
        const wallet = sequence.getWallet();
        if(wallet.isConnected()) {
            openWallet();
            setButtonText("Open Wallet");
        }else{
            connect(true);
        }
    }

    const connect = async (authorize: boolean = false) => {
        const wallet = sequence.getWallet()

        const connectDetails = await wallet.connect({
        app: 'BestBid',
        authorize,
        })

        console.warn('connectDetails', { connectDetails })

        if (authorize) {
        const ethAuth = new ETHAuth()

        if (connectDetails.proof) {
            const decodedProof = await ethAuth.decodeProof(connectDetails.proof.proofString, true)

            console.warn({ decodedProof })

            const isValid = await wallet.utils.isValidTypedDataSignature(
            await wallet.getAddress(),
            connectDetails.proof.typedData,
            decodedProof.signature,
            await wallet.getAuthChainId()
            )
            console.log('isValid?', isValid)
            if (!isValid) throw new Error('sig invalid')

            setButtonText("Open Wallet");
        }
        }
        
    }

    const disconnect = () => {
        const wallet = sequence.getWallet()
        wallet.disconnect()

        setButtonText("Connect Wallet");
    }

    const openWallet = () => {
        const wallet = sequence.getWallet()
        wallet.openWallet()
    }

    

    return <div>
      <header id="header_main" className="header_1 js-header" ref={headerRef}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
                        <div id="site-header-inner" className="flex">
                            <div id="site-logo" className="clearfix">
                                <div id="site-logo-inner">
                                    <Link to="/" rel="home" className="main-logo">
                                        <img id="logo_header" className='logo-dark' src={logo} srcSet={logo2x} alt="nft-gaming" />
                                        <img id="logo_header" className='logo-light' src={logolight} srcSet={logolight2x} alt="nft-gaming" />
                                    </Link>
                                </div>
                            </div>
                            

                            <nav id="main-nav" className="main-nav" ref={menuLeft}>
                                <ul id="menu-primary-menu" className="menu">
                                    {
                                        menus.map((data,index) => (
                                            <li key={index} onClick={()=> handleOnClick(index)} className={`menu-item menu-item-has-children ${activeIndex === index ? 'active' : ''} ` }   >
                                                <Link to="#">{data.name}</Link>
                                                <ul className="sub-menu" >
                                                    {
                                                        data.namesub.map((submenu,index) => (
                                                            <li key={index} className={
                                                                pathname === submenu.links
                                                                    ? "menu-item current-item"
                                                                    : "menu-item"
                                                                }><Link to={submenu.links}>{submenu.sub}</Link></li>
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                            <div className="button-connect-wallet">
                                <Button onClick={() => walletActions()} className="sc-button wallet  style-2">
                                    <img src={icon} alt="icon" />
                                    <span>{buttonText}</span>
                                </Button>
                            </div>

                            <DarkMode />
                        </div>
                    </div>
                </div>
            </div>
        </header>
  </div>;
};

export default Header;
