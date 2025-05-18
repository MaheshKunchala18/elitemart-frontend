import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';
import NavigationBar from '../components/Navbar';
import axios from 'axios';
import '../styles/WishlistPage.css';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const handleConfirmClear = async () => {
    try {
      setClearing(true);
      await axios.post(`${backendUrl}/wishlist/clear`, { userId });
      setWishlistItems([]);
      setEmpty(true);
      toast.success('Wishlist cleared');
      setShowConfirm(false);
    } catch (err) {
      console.error('Error clearing wishlist:', err);
      toast.error('Error clearing wishlist');
    } finally {
      setClearing(false);
    }
  };

  const discountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
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
        <div className="d-flex justify-content-end mt-2 mb-4">
          <Button variant="danger" onClick={() => setShowConfirm(true)} disabled={clearing}>
            {clearing ? 'Clearing...' : 'Clear Wishlist'}
          </Button>
        </div>
        <Row className="g-4">
          {wishlistItems.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="hover-card">
                <div className="product-img position-relative">
                  <Card.Img variant="top" src={product.thumbnail} className="img" />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2"
                    title="Remove from wishlist"
                    onClick={() => removeItem(product._id)}
                    style={{ borderRadius: '50%' }}
                  >
                    <FaHeartBroken color='white' />
                  </Button>
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2 fw-semibold fs-6 text-truncate">
                    {product.name}
                  </Card.Title>
                  <Card.Text as="div" className="flex-grow-1">
                    <span className="d-block mb-1">Category: {product.category}</span>
                    <span> Price: </span>
                    <span className="fw-semibold"> ₹{product.discountPrice}</span>{' '}
                    <span className="text-muted text-decoration-line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="discount_per">{discountPercentage(product.originalPrice, product.discountPrice)}% off</span>
                    <span className="d-block mt-1 mb-2">Rating: {product.rating} ★</span>
                  </Card.Text>

                  <Link to={`/product/${product._id}`} className="my-2 btn btn-primary" target="_blank" rel="noopener noreferrer">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* Confirmation Modal */}
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Clear Wishlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to clear your entire wishlist? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmClear} disabled={clearing}>
              {clearing ? 'Clearing...' : 'Clear'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container >
    </>
  );
};

export default WishlistPage; 