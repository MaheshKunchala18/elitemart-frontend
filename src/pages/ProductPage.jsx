import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import NavigationBar from '../components/Navbar';
import axios from 'axios';
import '../styles/ProductPage.css';


const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const userId = localStorage.getItem('userId');
  const quantity = 1;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`);
        setProduct(response.data);
        setSelectedImage(response.data.thumbnail);
      } catch (error) {
        console.error('Error fetching product:', error);
        setEmpty(true);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      if (!userId) {
        toast.warn('You need to login first to add products to the cart.');
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
        userId,
        productId,
        quantity
      });

      if (response.status === 200) {
        toast.success('Product added to cart successfully!');
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <NavigationBar />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Container className="mt-5 pt-5">
        {empty ?
          <div className='d-flex justify-content-center mt-5'>
            <div className='fs-5 mx-2'>Product not found!</div>
          </div>
          : loading ? (
            <div className='d-flex justify-content-center mt-5'>
              <Spinner animation="grow" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <div className='fs-5 mx-2'>Loading Product...</div>
            </div>
          ) : (
            <Row className="mt-4">
              <Col md={6}>
                <Row>
                  <Col xs={3} sm={3} md={3} lg={3} className="pe-0">
                    {/* Thumbnails column */}
                    <div className="thumbnail-gallery">
                      {product.images && product.images.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`${product.name} - view ${index + 1}`}
                          className={`img-thumbnail mb-2 ${selectedImage === image ? 'selected-thumbnail' : ''}`}
                          onClick={() => setSelectedImage(image)}
                        />
                      ))}
                      {/* Add thumbnail as well if it's not in the images array */}
                      {product.thumbnail && !product.images?.includes(product.thumbnail) && (
                        <img 
                          src={product.thumbnail} 
                          alt={`${product.name} - thumbnail`}
                          className={`img-thumbnail mb-2 ${selectedImage === product.thumbnail ? 'selected-thumbnail' : ''}`}
                          onClick={() => setSelectedImage(product.thumbnail)}
                        />
                      )}
                    </div>
                  </Col>
                  <Col xs={9} sm={9} md={9} lg={9} className="ps-1">
                    {/* Main product image */}
                    <img src={selectedImage} alt={product.name} className="img-fluid main-product-image" />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <h1>{product.name}</h1>
                <h4>₹{product.discountPrice} <span className='original_price'>₹{product.originalPrice}</span> </h4>
                <p>{product.description}</p>
                <p>Rating: {product.rating} ★</p>
                <Button variant="success" className="me-2" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="primary">Buy Now</Button>
              </Col>
            </Row>
          )}
      </Container>
    </>
  );
};

export default ProductPage;
