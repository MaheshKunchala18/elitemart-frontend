import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/CartPage.css';

const CartPage = () => {
    const cartItems = [
        {
            id: 1,
            name: 'AJANTA Analog 32 cm X 32 cm Wall Clock',
            imageUrl: 'wall-clock-image-url', // Replace with actual image URL
            price: 978,
            originalPrice: 1198,
            quantity: 2,
        },
        {
            id: 2,
            name: 'CAMPUS MIKE (N) Running Shoes For Men',
            imageUrl: 'running-shoes-image-url', // Replace with actual image URL
            price: 866,
            originalPrice: 1699,
            quantity: 1,
        },
    ];

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Container className="cart-page">
            <Row>
                <Col md={8}>
                    <div className="cart-items-section">
                        {cartItems.map((item) => (
                            <Card key={item.id} className="cart-item-card mb-3">
                                <Row className="align-items-center">
                                    <Col xs={4}>
                                        <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                    </Col>
                                    <Col xs={8}>
                                        <h5>{item.name}</h5>
                                        <div className="price-section">
                                            <span className="current-price">₹{item.price}</span>
                                            <span className="original-price">₹{item.originalPrice}</span>
                                        </div>
                                        <div className="quantity-section">
                                            <Button variant="outline-secondary" className="quantity-btn">-</Button>
                                            <span className="quantity">{item.quantity}</span>
                                            <Button variant="outline-secondary" className="quantity-btn">+</Button>
                                        </div>
                                        <Button variant="link" className="remove-btn">Remove</Button>
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
                            <Button variant="warning" className="place-order-btn">PLACE ORDER</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
