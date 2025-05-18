import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavigationBar from '../components/Navbar';
import axios from 'axios';
import '../styles/OrderPage.css'


const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/orders/${userId}`);

                // Back-end may return either an array of items or an object with message indicating no orders found
                const orderArray = Array.isArray(data) ? data : [];

                setOrders(orderArray);
                if (orderArray.length === 0) setEmpty(true);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setEmpty(true);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [backendUrl, userId]);

    const totalOriginalPrice = orders.reduce((acc, item) => acc + item.productId.originalPrice * item.quantity, 0);
    const totalDiscountedPrice = orders.reduce((acc, item) => acc + item.productId.discountPrice * item.quantity, 0);
    const totalSavings = totalOriginalPrice - totalDiscountedPrice;

    return (
        <>
            <NavigationBar />
            <Container className="order-page">
                <Row>
                    <Col md={8}>
                        <div className="order-items-section">
                            {loading ? (
                                <p>Loading...</p>
                            ) : empty ? (
                                <p>No orders found.</p>
                            ) : (
                                orders.map((order) => (
                                    <Card key={order._id} className="order-item-card mb-4">
                                        <Card.Body>
                                            <h6>Order ID: {order._id}</h6>
                                            <p>Order Date: {new Date(order.orderDate).toLocaleString('en-IN').toUpperCase()}</p>
                                            <div className="order-items">
                                                <Row key={order._id} className="align-items-center">
                                                    <Col className="order-item-image mb-2" xs={12} sm={6} md={6} >
                                                        <img src={order.productId.thumbnail} alt={order.productId.name} />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} className="mt-2">
                                                        <h5>{order.productId.name}</h5>
                                                        <div className="price-section mt-3 mb-2">
                                                            <span className="current-price">₹{order.productId.discountPrice}</span>
                                                            <span className="original-price" style={{ textDecoration: 'line-through', color: 'gray' }}>
                                                                ₹{order.productId.originalPrice}
                                                            </span>
                                                            <span style={{ color: 'green', marginLeft: '10px' }}>
                                                                {Math.round(((order.productId.originalPrice - order.productId.discountPrice) / order.productId.originalPrice) * 100)}% Off
                                                            </span>
                                                        </div>
                                                        <p>Quantity: {order.quantity}</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </div>
                    </Col>

                    <Col md={4}>
                        <Card className="price-details-card">
                            <Card.Body>
                                <h5>PRICE DETAILS</h5>
                                <div className="price-summary">
                                    <p>Price ({orders.length} items): <span>₹{totalOriginalPrice}</span></p>

                                    <p>Discount: <span style={{ color: 'green' }}>−₹{totalSavings}</span></p>

                                    <p>Total Amount: <span>₹{totalDiscountedPrice}</span></p>

                                    <p style={{ color: 'blue' }}>You saved ₹{totalSavings} on these orders</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default OrderPage;
