import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
// import '../styles/homepage.css';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="product-card"
    >
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.discountPrice}</Card.Text>
          <motion.button
            className="add-to-cart-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
