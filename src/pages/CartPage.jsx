import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/CartPage.css';
import NavigationBar from '../components/Navbar';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);

    const userId = localStorage.getItem('userId');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    // Fetch cart items from backend
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${backendUrl}/cart/${userId}`);
                // console.log(response.data);
                setCartItems(response.data.items);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
                setEmpty(true);
            }
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

    // Handle place order (Clears the cart)
    const placeOrder = async () => {
        try {
            await axios.post(`${backendUrl}/cart/clear`, { userId });
            setCartItems([]); // Clear the cart UI after placing order
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };


    if (loading) {
        return (
            <>
                <NavigationBar />
                <p>Loading cart...</p>
            </>
        );
    } else if (empty) {
        return (
            <>
                <NavigationBar />
                <p>Cart is Empty!!</p>
            </>
        );
    }

    const totalPrice = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

    return (
        <>
            <NavigationBar />
            <Container className="cart-page">
                <Row>
                    <Col md={8}>
                        <div className="cart-items-section">
                            {cartItems.map((item) => (
                                <Card key={item.productId._id} className="cart-item-card mb-3">
                                    <Row className="align-items-center">
                                        <Col xs={4}>
                                            <img src={item.productId.imageUrl} alt={item.productId.name} className="cart-item-image" />
                                        </Col>
                                        <Col xs={8}>
                                            <h5>{item.productId.name}</h5>
                                            <div className="price-section">
                                                <span className="current-price">₹{item.productId.price}</span>
                                                <span className="original-price">₹{item.productId.originalPrice}</span>
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
                                            </div>
                                            <Button variant="link" className="remove-btn" onClick={() => removeItem(item.productId._id)}>
                                                Remove
                                            </Button>
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
                                    <p>Price ({cartItems.length} items): <span>₹{totalPrice}</span></p>
                                    <p>Total Amount: <span>₹{totalPrice}</span></p>
                                </div>
                                <Button variant="warning" className="place-order-btn" onClick={placeOrder}>
                                    PLACE ORDER
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
