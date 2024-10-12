import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import NavigationBar from '../components/Navbar';

const ProductPage = () => {
  const { productId } = useParams(); // Get product ID from URL params

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`);
        setProduct(response.data); // Assuming the response returns an array of products
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <>
      <NavigationBar />
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
    </>
  );
};

export default ProductPage;
