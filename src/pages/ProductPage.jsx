import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router
import { products } from '../data/data'; // Import products data
import { Container, Row, Col, Button } from 'react-bootstrap';

const ProductPage = () => {
  const { productId } = useParams(); // Get product ID from URL params
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <img src={product.imageUrl} alt={product.name} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <h3>₹{product.price}</h3>
          <p>{product.description}</p>
          <p>Rating: {product.rating} ★</p>
          <Button variant="success" className="me-2">
            Add to Cart
          </Button>
          <Button variant="primary">Buy Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
