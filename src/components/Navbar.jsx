import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, OverlayTrigger, Popover, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import '../styles/Navbar.css';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // Fetch products on component mount
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Handle click outside to close search results
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Debounce search query
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        const filtered = products.filter(product =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
        setShowResults(true);
      } else {
        setFilteredProducts([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, products]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProductSelect = (productId) => {
    setShowResults(false);
    setShowSearchModal(false);
    navigate(`/product/${productId}`);
  };

  const handleSeeAllResults = () => {
    setShowResults(false);
    setShowSearchModal(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
    if (!showSearchModal) {
      setSearchQuery('');
      setFilteredProducts([]);
    }
  };

  const renderRatingStars = (rating) => {
    if (!rating) return null;

    return (
      <div className="search-result-rating">
        <FontAwesomeIcon icon={faStar} className="rating-star" />
        <span>{rating}</span>
      </div>
    );
  };

  const renderSearchResults = () => (
    <AnimatePresence>
      {showResults && filteredProducts.length > 0 && (
        <motion.div
          className="search-results"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {isLoading ? (
            <div className="text-center py-3">Loading...</div>
          ) : (
            filteredProducts.slice(0, 6).map(product => (
              <motion.div
                key={product.id || product._id}
                whileHover={{ backgroundColor: '#f8f9fa' }}
                className="search-result-item"
                onClick={() => handleProductSelect(product.id || product._id)}
              >
                <div className="search-result-content">
                  <div className="search-result-title">{product.name}</div>
                  <div className="search-result-details">
                    <span className="search-result-category">{product.category}</span>
                    <span className="search-result-price">₹{product.discountPrice}</span>
                    {renderRatingStars(product.rating)}
                  </div>
                </div>
                {product.thumbnail && (
                  <div className="search-result-thumbnail-container">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="search-result-thumbnail"
                    />
                  </div>
                )}
              </motion.div>
            ))
          )}
          {filteredProducts.length > 6 && (
            <div
              className="text-center py-2 see-all-results"
              onClick={handleSeeAllResults}
            >
              <small>See all {filteredProducts.length} results</small>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const profilePopover = (
    <Popover id="popover-basic" className="profile-popover">
      <Popover.Header as="h3">Profile</Popover.Header>
      <Popover.Body className='popover-body-text'>
        <Button href='/orders' className='mb-2' variant="outline-secondary"> My Orders </Button>
        <Button href='/wishlist' className='my-1' variant="outline-secondary"> My Wishlist </Button>
        <Button className='mt-2' variant="danger" onClick={handleLogout}>Logout</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Navbar fixed="top" bg="light" expand="lg" className="navbar-modern">
        <Container>
          <Navbar.Brand href="/" className="navbar-logo">
            EliteMart
          </Navbar.Brand>

          <div className="search-container position-relative d-none d-md-block" ref={searchRef}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="search-input-wrapper"
            >
              <input
                name='search'
                type="text"
                placeholder="Search for products..."
                className="form-control search-input"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowResults(true)}
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </motion.div>

            {renderSearchResults()}
          </div>

          <div className="d-md-none">
            <Button 
              variant="outline-secondary" 
              className="mobile-search-btn"
              onClick={toggleSearchModal}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              {isLoggedIn ? (
                <>
                  <Button variant="outline-secondary" className='cart-icon' onClick={() => navigate('/cart')}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Button>

                  <OverlayTrigger trigger="click" placement="bottom" overlay={profilePopover} rootClose>
                    <Button variant="link" className='profile-btn' >
                      <FontAwesomeIcon icon={faUserCircle} size="2x" />
                    </Button>
                  </OverlayTrigger>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className='mx-2 my-1' variant="outline-primary" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className='mx-2 my-1' variant="outline-success" onClick={() => navigate('/signup')}>
                      Sign Up
                    </Button>
                  </motion.div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Search Modal for small screens */}
      <Modal 
        show={showSearchModal} 
        onHide={toggleSearchModal} 
        centered
        className="search-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Search Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="position-relative" ref={searchRef}>
            <input
              name='search'
              type="text"
              placeholder="Search for products..."
              className="form-control search-input mb-3"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            {renderSearchResults()}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavigationBar;
