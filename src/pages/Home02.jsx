import React from 'react';
import Header from '../components/header/Header';
// import Footer from '../components/footer/Footer';
import Slider02 from '../components/slider/Slider02';
import dataSlider2 from '../assets/fake-data/dataSlider2';
import LiveAution from '../components/layouts/home02/LiveAution';
import dataLiveAution from '../assets/fake-data/dataLiveAution'
import FooterStyle2 from '../components/footer/FooterStyle2';

const Home02 = () => {
  return <div className='home-2'>
      <Header />
      <Slider02 data={dataSlider2} />
      <LiveAution data={dataLiveAution} />
      <FooterStyle2 />
  </div>;
};

export default Home02;
