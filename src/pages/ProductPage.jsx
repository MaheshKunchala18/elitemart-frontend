import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import NavigationBar from '../components/Navbar';
import { FaChevronUp, FaChevronDown, FaHeart, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import '../styles/ProductPage.css';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [thumbsToShow, setThumbsToShow] = useState(4);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
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

  useEffect(() => {
    // Update the number of thumbnails to show based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setThumbsToShow(4);
      } else {
        setThumbsToShow(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchInitialStatus = async () => {
    if (!userId) return; // no status if not logged in
    try {
      const [cartRes, wishRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/${userId}`),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/wishlist/${userId}`)
      ]);
      const cartItems = cartRes.data?.items || [];
      const wishItems = wishRes.data?.items || [];
      setInCart(cartItems.some(item => (item.productId?._id || item.productId) === productId));
      setInWishlist(wishItems.some(item => (item._id || item.id) === productId));
    } catch (err) {
      console.error('Error fetching status', err);
    }
  };

  if (productId) {
    fetchInitialStatus();
  }

  const handleAddToCart = async () => {
    try {
      if (!userId) {
        toast.warn('You need to login first to add products to the cart');
        return;
      }
      if (inCart) {
        // Remove from cart
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cart`, { data: { userId, productId } });
        setInCart(false);
        toast.info('Product removed from cart');
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
        userId,
        productId,
        quantity
      });

      if (response.status === 200) {
        toast.success('Product added to cart');
        setInCart(true);
      } else {
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('An error occurred. Please try again later');
    }
  };

  const handleWishlistToggle = async () => {
    if (!userId) {
      toast.warn('You need to login first to add products to the wishlist');
      return;
    }
    try {
      if (inWishlist) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/wishlist`, { data: { userId, productId } });
        setInWishlist(false);
        toast.info('Removed from your wishlist');
      } else {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/wishlist`, {
          userId,
          productId
        });
        if (response.status === 200) {
          toast.success('Added to your wishlist');
          setInWishlist(true);
        }
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Could not update wishlist');
    }
  };

  // Get all images including thumbnail
  const getAllImages = () => {
    let allImages = [...(product.images || [])];
    if (product.thumbnail && !allImages.includes(product.thumbnail)) {
      allImages.unshift(product.thumbnail);
    }
    return allImages;
  };

  const scrollUp = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    }
  };

  const scrollDown = () => {
    const allImages = getAllImages();
    if (scrollPosition < allImages.length - thumbsToShow) {
      setScrollPosition(scrollPosition + 1);
    }
  };

  return (
    <>
      <NavigationBar />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Container className="mt-5 pt-5" fluid>
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
            <Row className="mt-4 product-layout-row flex-column flex-md-row align-items-stretch">
              {/* Thumbnail Column */}
              <Col xs={12} md={2} className="d-flex flex-row flex-md-column align-items-end justify-content-center mb-3 mb-md-0">
                <div className="thumbnail-nav-button thumbnail-nav-up d-flex justify-content-center align-items-center mb-2 mx-1"
                  onClick={scrollUp}
                  style={{ opacity: scrollPosition <= 0 ? 0.5 : 1 }}>
                  <FaChevronUp />
                </div>
                <div className="thumbnail-gallery no-scrollbar d-flex flex-row flex-md-column align-items-center justify-content-center">
                  {getAllImages().slice(scrollPosition, scrollPosition + thumbsToShow).map((image, index) => (
                    <img
                      key={index + scrollPosition}
                      src={image}
                      alt={`${product.name} - view ${index + scrollPosition + 1}`}
                      className={`img-thumbnail my-1 ${selectedImage === image ? 'selected-thumbnail' : ''}`}
                      style={{ maxWidth: '60px', maxHeight: '60px', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
                <div className="thumbnail-nav-button thumbnail-nav-down d-flex justify-content-center align-items-center mt-1 mx-1"
                  onClick={scrollDown}
                  style={{ opacity: scrollPosition >= getAllImages().length - thumbsToShow ? 0.5 : 1 }}>
                  <FaChevronDown />
                </div>
              </Col>

              {/* Main Image Column */}
              <Col xs={12} md={5} className="d-flex align-items-center justify-content-center mb-3 mb-md-0">
                <div className="main-image-wrapper position-relative" style={{ width: '90%', maxWidth: '100%' }}>
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="img-fluid main-product-image d-block"
                    style={{ maxHeight: '350px', width: '100%' }}
                  />
                  <Button
                    variant={inWishlist ? 'danger' : 'light'}
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    onClick={handleWishlistToggle}
                    className="wishlist-btn-img"
                    size="sm"
                  >
                    <FaHeart color={inWishlist ? '' : 'gray'} />
                  </Button>
                </div>
              </Col>

              {/* Product Details Column */}
              <Col xs={12} md={4} className="mt-4">
                <h3>{product.name}</h3>
                <h5>₹{product.discountPrice} <span className='original_price'>₹{product.originalPrice}</span></h5>
                <p>{product.description}</p>
                <p>Rating: {product.rating} ★</p>
                <Button
                  variant={inCart ? "success" : "success"}
                  onClick={handleAddToCart}
                  title={inCart ? 'Remove from Cart' : 'Add to Cart'}>
                  <FaShoppingCart className="me-1" /> {inCart ? 'Remove' : 'Add'}
                </Button>
                <Button variant="primary" className="mx-2">Buy Now</Button>
              </Col>
            </Row>
          )}
      </Container>
    </>
  );
};

export default ProductPage;
