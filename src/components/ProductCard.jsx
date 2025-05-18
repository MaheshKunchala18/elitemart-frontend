import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/ProductCard.css';


const ProductCard = ({ product }) => {
  const userId = localStorage.getItem('userId');
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    // fetch wishlist if logged in
    const fetchWishlist = async () => {
      if (!userId) return;
      try {
        const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/wishlist/${userId}`);
        const ids = (resp.data?.items || []).map(item => item._id || item.id || item);
        setWishlistIds(ids);
      } catch (err) {
        console.error('Error fetching wishlist', err);
      }
    };

    fetchWishlist();
  }, [userId]);


  const handleWishlistToggle = async (productId, isInWishlist) => {
    if (!userId) {
      toast.warn('You need to login first to add products to the wishlist');
      return;
    }
    try {
      if (isInWishlist) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/wishlist`, { data: { userId, productId } });
        setWishlistIds(prev => prev.filter(id => id !== productId));
        toast.info('Removed from wishlist');
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/wishlist`, { userId, productId });
        setWishlistIds(prev => [...prev, productId]);
        toast.success('Added to wishlist');
      }
    } catch (err) {
      console.error('Error updating wishlist', err);
      toast.error('Could not update wishlist');
    }
  };


  const discountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
  };


  return (
    <Card className="product-card hover-card position-relative">
      <div className="product-thumbnail position-relative">
        <Card.Img variant="top" src={product.thumbnail} className="img" />
        {(() => {
          const inWish = wishlistIds.includes(product._id);
          return (
            <Button
              className="wishlist-btn"
              size="sm"
              variant={inWish ? 'danger' : 'light'}
              title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={() => handleWishlistToggle(product._id, inWish)}
            >
              <FaHeart color={inWish ? '' : 'gray'} />
            </Button>
          );
        })()}
      </div>

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <div className="mb-3">
          <div>Category: {product.category}</div>
          <div>
            Price: ₹{product.discountPrice}
            <span className="original_price">₹{product.originalPrice}</span>
            <span className="discount_percentage">{discountPercentage(product.originalPrice, product.discountPrice)}% off</span>
          </div>
          <div>Rating: {product.rating} ★</div>
        </div>

        <Link to={`/product/${product._id}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;