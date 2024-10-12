import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfilePopover = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <NavDropdown title="Profile" id="basic-nav-dropdown">
      <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
      <NavDropdown.Item href="/orders">My Orders</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
};

export default ProfilePopover;
