import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const CartIcon = () => {
  return (
    <NavLink to="/cart" className="cart-icon">
      <FaShoppingCart size={24} />
    </NavLink>
  );
};

export default CartIcon;
