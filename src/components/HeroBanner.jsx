import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/herobanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      {/* Motion Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hero-content"
      >
        <Container>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hero-title"
          >
            Your Favorite Products, All in One Place
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="hero-subtitle"
          >
            Discover the latest deals and hottest trends. Shop now for unbeatable prices!
          </motion.p>
          
          {/* Animated Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button className="shop-now-btn">Shop Now</Button>
          </motion.div>
        </Container>
      </motion.div>

      {/* Abstract shapes for design */}
      <div className="abstract-shape one"></div>
      <div className="abstract-shape two"></div>
      <div className="abstract-shape three"></div>
    </div>
  );
};

export default HeroBanner;
