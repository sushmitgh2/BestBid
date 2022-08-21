import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import LiveAutions from '../components/layouts/item/LiveAutions';
import dataPopularCollection from '../assets/fake-data/dataPopularCollection';
import  Newsletters from '../components/layouts/Newsletters';
import Footer from '../components/footer/Footer';

const Item = () => {
  return <div className='item'>
    <Header />
    <LiveAutions data={dataPopularCollection} />
    <Newsletters />
    <Footer />
  </div>;
};

export default Item;
