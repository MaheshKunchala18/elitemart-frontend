import React from 'react';
import { NavDropdown } from 'react-bootstrap';

const ProfilePopover = () => {
  return (
    <NavDropdown title="Profile" id="basic-nav-dropdown">
      <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
      <NavDropdown.Item href="/orders">My Orders</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
    </NavDropdown>
  );
};

export default ProfilePopover;
