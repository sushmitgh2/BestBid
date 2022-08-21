import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import WalletConnect from '../components/layouts/Bid';
import Footer from '../components/footer/Footer';

const ConnectWallet = () => {
  return <div>
    <Header />
  
    <WalletConnect />
    <Footer />
  </div>;
};

export default ConnectWallet;
