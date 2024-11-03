import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import NavigationBar from '../components/Navbar';
import '../styles/HomePage.css';

const HomePage = () => {
  // Sample data for products
  const products = [
    { id: 1, name: 'Smartphone', price: 299, image: '/images/smartphone.jpg' },
    { id: 2, name: 'Laptop', price: 999, image: '/images/laptop.jpg' },
    { id: 3, name: 'Headphones', price: 199, image: '/images/headphones.jpg' },
    { id: 4, name: 'Camera', price: 499, image: '/images/camera.jpg' },
  ];

  return (
    <>
      <NavigationBar />
      <div className="homepage mt-5 pt-4">
        <Categories />
        <HeroBanner />

        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
