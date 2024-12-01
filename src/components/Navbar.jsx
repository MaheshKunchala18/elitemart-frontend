import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const profilePopover = (
    <Popover id="popover-basic" className="profile-popover">
      <Popover.Header as="h3">Profile</Popover.Header>
      <Popover.Body className='popover-body-text'>
        <Button href='/orders' className='mb-1' variant="outline-secondary"> My Orders </Button>
        <Button className='mt-2' variant="danger" onClick={handleLogout}>Logout</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar fixed="top" bg="light" expand="lg" className="navbar-modern">
      <Container>
        <Navbar.Brand href="/" className="navbar-logo">
          EliteMart
        </Navbar.Brand>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <input name='search' type="text" placeholder="Search for products..." className="form-control" />
        </motion.div>

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
  );
};

export default NavigationBar;
