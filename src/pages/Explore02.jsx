import React from 'react';
import Header from '../components/header/Header';
import PopularCollection from '../components/layouts/explore2/PopularCollection';
import dataTrendingCollections from '../assets/fake-data/dataTrendingCollections'
import Footer from '../components/footer/Footer';

const Explore02 = () => {
  return <div>
    <Header />
      <PopularCollection data={dataTrendingCollections} />
      <Footer />
  </div>;
};

export default Explore02;
