import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';
import CartIcon from './CartIcon';
import ProfilePopover from './ProfilePopover';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; // Framer Motion for animations
import '../styles/navbar.css';

const NavigationBar = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar bg="light" expand="lg" className="navbar-modern">
        <Container>
          {/* E-Commerce Logo */}
          <Navbar.Brand href="/" className="navbar-logo">
            E-Commerce
          </Navbar.Brand>

          {/* Search Bar */}
          <SearchBar />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              {isLoggedIn ? (
                <>
                  {/* Cart Icon and Profile after login */}
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CartIcon />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <ProfilePopover />
                  </motion.div>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <AuthButtons />
                </motion.div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default NavigationBar;
