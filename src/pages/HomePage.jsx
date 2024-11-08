import React from 'react';
import NavigationBar from '../components/Navbar';
import Categories from '../components/Categories';
import HeroBanner from '../components/HeroBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import '../styles/HomePage.css';

const HomePage = () => {

  return (
    <>
      <NavigationBar />
      <div className="homepage mt-5 pt-4">
        <Categories />
        <HeroBanner />
        <FeaturedProducts />
      </div>
    </>
  );
};

export default HomePage;
