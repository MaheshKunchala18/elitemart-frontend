import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import NavigationBar from '../components/Navbar';
import axios from 'axios';
import '../styles/CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartEmpty, setCartEmpty] = useState(false);

    const userId = localStorage.getItem('userId');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${backendUrl}/cart/${userId}`);
                const items = response.data.items || [];
                if (items.length === 0) {
                    setCartEmpty(true);
                } else {
                    setCartEmpty(false);
                }
                setCartItems(items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setCartEmpty(true);
            }
            setLoading(false);
        };

        fetchCartItems();
    }, [backendUrl, userId]);

    // Handle quantity increase
    const increaseQuantity = async (productId) => {
        const item = cartItems.find((item) => item.productId._id === productId);
        const updatedQuantity = item.quantity + 1;

        try {
            await axios.post(`${backendUrl}/cart`, {
                userId,
                productId,
                quantity: 1 // Increment by 1
            });
            setCartItems((prevItems) =>
                prevItems.map((i) =>
                    i.productId._id === productId ? { ...i, quantity: updatedQuantity } : i
                )
            );
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Handle quantity decrease
    const decreaseQuantity = async (productId) => {
        const item = cartItems.find((item) => item.productId._id === productId);
        if (item.quantity <= 1) return; // Do not decrease below 1
        const updatedQuantity = item.quantity - 1;

        try {
            await axios.post(`${backendUrl}/cart`, {
                userId,
                productId,
                quantity: -1 // Decrement by 1
            });
            setCartItems((prevItems) =>
                prevItems.map((i) =>
                    i.productId._id === productId ? { ...i, quantity: updatedQuantity } : i
                )
            );
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Handle remove item from cart
    const removeItem = async (productId) => {
        try {
            await axios.delete(`${backendUrl}/cart`, {
                data: { userId, productId }
            });
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.productId._id !== productId)
            );
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // Handle place order (Add the products to the "My Orders page")
    const placeOrder = async () => {
        if (cartItems.length === 0) {
            toast.info('Cart is empty!')
            return;
        }

        const pendingToastId = toast.loading('Placing your order...');

        try {
            // Data for placing the order
            const orderData = {
                userId,
                items: cartItems // Send the entire array of cart items
            };

            // Post request to add the order
            await axios.post(`${backendUrl}/orders`, orderData);

            // Clear the cart after placing the order
            await axios.post(`${backendUrl}/cart/clear`, { userId });

            // Clear the cart
            setCartItems([]);

            // Update the pending toast to a success message
            toast.update(pendingToastId, {
                render: 'Order placed successfully! Check in My Orders Page.',
                type: 'success',
                isLoading: false,
                autoClose: 3000 // Show success toast for 3 seconds
            });
        } catch (error) {
            console.error('Error placing order:', error);

            // Update the pending toast to an error message
            toast.update(pendingToastId, {
                render: 'Error placing order. Please try again.',
                type: 'error',
                isLoading: false,
                autoClose: 3000 // Show error toast for 3 seconds
            });
        }
    };


    const clearCart = async () => {
        if (cartItems.length === 0) {
            toast.info('Cart is empty!')
            return;
        }

        try {
            await axios.post(`${backendUrl}/cart/clear`, { userId });
            setCartItems([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };


    if (loading) {
        return (
            <>
                <NavigationBar />
                <div className='min-vh-100 d-flex align-items-center justify-content-center'>
                    <Spinner animation="grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <div className='fs-5 mx-2'>Loading Cart...</div>
                </div>
            </>
        );
    } else if (cartEmpty) {
        return (
            <>
                <NavigationBar />
                <div className='min-vh-100 d-flex align-items-center justify-content-center'>
                    <div className='fs-5 mx-2'>Cart is Empty!!</div>
                </div>
            </>
        );
    }

    const totalOriginalPrice = cartItems.reduce((acc, item) => acc + item.productId.originalPrice * item.quantity, 0);
    const totalDiscountedPrice = cartItems.reduce((acc, item) => acc + item.productId.discountPrice * item.quantity, 0);
    const totalSavings = totalOriginalPrice - totalDiscountedPrice;

    return (
        <>
            <NavigationBar />
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Container className="cart-page mt-5 pt-5">
                <Row className="my-4 py-2">
                    <Col md={8}>
                        <div className="cart-items-section">
                            {cartItems.map((item) => (
                                <Card key={item.productId._id} className="cart-item-card mb-4">
                                    <Row className="align-items-center">
                                        <Col className="cart-item-image mb-3" xs={12} sm={6}>
                                            <img src={item.productId.thumbnail} alt={item.productId.name} />
                                        </Col>

                                        <Col xs={12} sm={6} className="mt-2">
                                            <h5>{item.productId.name}</h5>

                                            <div className="price-section">
                                                {/* Discount Price */}
                                                <span className="current-price">₹{item.productId.discountPrice}</span>

                                                {/* Original Price with strikethrough */}
                                                <span className="original-price" style={{ textDecoration: 'line-through', color: 'gray' }}>
                                                    ₹{item.productId.originalPrice}
                                                </span>

                                                {/* Discount Percentage */}
                                                <span style={{ color: 'green', marginLeft: '10px' }}>
                                                    {Math.round(((item.productId.originalPrice - item.productId.discountPrice) / item.productId.originalPrice) * 100)}% Off
                                                </span>
                                            </div>

                                            <div className="quantity-section">
                                                <Button
                                                    variant="outline-secondary"
                                                    className="quantity-btn"
                                                    onClick={() => decreaseQuantity(item.productId._id)}
                                                >
                                                    -
                                                </Button>
                                                <span className="quantity">{item.quantity}</span>
                                                <Button
                                                    variant="outline-secondary"
                                                    className="quantity-btn"
                                                    onClick={() => increaseQuantity(item.productId._id)}
                                                >
                                                    +
                                                </Button>
                                                <Button variant="link" className="remove-btn" onClick={() => removeItem(item.productId._id)}>
                                                    Remove
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </div>
                    </Col>

                    <Col md={4}>
                        <Card className="price-details-card">
                            <Card.Body>
                                <h5>PRICE DETAILS</h5>
                                <div className="price-summary">
                                    {/* Original price before discounts */}
                                    <p>Price ({cartItems.length} items): <span>₹{totalOriginalPrice}</span></p>

                                    {/* Discount amount in green */}
                                    <p>Discount: <span style={{ color: 'green' }}>−₹{totalSavings}</span></p>

                                    {/* Final total after discounts */}
                                    <p>Total Amount: <span>₹{totalDiscountedPrice}</span></p>

                                    {/* Display how much user saved */}
                                    <p style={{ color: 'blue' }}>You will save ₹{totalSavings} on this order</p>
                                </div>
                                <Button variant="success" className="place-order-btn mt-3" onClick={placeOrder}>
                                    PLACE ORDER
                                </Button>
                                <Button variant="danger" className="place-order-btn mt-3" onClick={clearCart}>
                                    CLEAR CART
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default CartPage;
