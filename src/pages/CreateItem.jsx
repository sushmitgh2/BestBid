import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Create from '../components/layouts/creacte-item/Create';
import Footer from '../components/footer/Footer';

const CreateItem = () => {
return <div>
    <Header />
    <Create />
    <Footer />
  </div>;
};

export default CreateItem;
