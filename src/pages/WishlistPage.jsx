import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../components/Navbar';
import '../styles/WishlistPage.css';
import { FaHeartBroken } from 'react-icons/fa';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    const fetchWishlist = async () => {
      try {
        const resp = await axios.get(`${backendUrl}/wishlist/${userId}`);
        setWishlistItems(resp.data.items || []);
        if (!resp.data.items || resp.data.items.length === 0) setEmpty(true);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setEmpty(true);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [backendUrl, userId, navigate]);

  const removeItem = async (productId) => {
    try {
      await axios.delete(`${backendUrl}/wishlist`, { data: { userId, productId } });
      setWishlistItems(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const moveToCart = async (productId) => {
    try {
      await axios.post(`${backendUrl}/cart`, { userId, productId, quantity: 1 });
      await removeItem(productId);
      toast.success('Moved to cart!');
    } catch (err) {
      console.error('Error moving to cart:', err);
      toast.error('Error moving to cart');
    }
  };

  if (loading) {
    return (
      <>
        <NavigationBar />
        <div className='min-vh-100 d-flex align-items-center justify-content-center'>
          <Spinner animation="grow" />
        </div>
      </>
    );
  }

  if (empty) {
    return (
      <>
        <NavigationBar />
        <div className='min-vh-100 d-flex flex-column align-items-center justify-content-center'>
          <FaHeartBroken size={48} className='text-danger mb-3' />
          <h5>Your wishlist is empty!</h5>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Container className="wishlist-page mt-5 pt-5">
        <Row className="g-4">
          {wishlistItems.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm h-100 hover-card">
                <div className="position-relative">
                  <Card.Img variant="top" src={product.thumbnail} />
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2"
                    onClick={() => removeItem(product._id)}
                  >
                    <FaHeartBroken />
                  </Button>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2 fw-semibold fs-6 text-truncate">
                    {product.name}
                  </Card.Title>
                  <Card.Text className="flex-grow-1">
                    <span className="text-success fw-semibold">₹{product.discountPrice}</span>{' '}
                    <span className="text-muted text-decoration-line-through">
                      ₹{product.originalPrice}
                    </span>
                  </Card.Text>
                  <Button variant="success" onClick={() => moveToCart(product._id)}>
                    Move to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default WishlistPage; 