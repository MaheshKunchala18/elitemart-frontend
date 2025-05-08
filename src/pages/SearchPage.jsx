import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/SearchPage.css';

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
                if (response.data) {
                    // Filter products based on search query
                    const filteredProducts = response.data.filter(product =>
                        product.name?.toLowerCase().includes(query.toLowerCase()) ||
                        product.description?.toLowerCase().includes(query.toLowerCase()) ||
                        product.category?.toLowerCase().includes(query.toLowerCase())
                    );
                    setProducts(filteredProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    return (
        <>
            <Navbar />
            <Container className="search-page">
                <h2 className="search-results-heading">
                    {loading ? 'Searching...' : `Search Results for "${query}"`}
                </h2>
                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <div className="text-center py-5 text-danger">{error}</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-5">
                        <p>No products found matching "{query}"</p>
                    </div>
                ) : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {products.map(product => (
                            <Col key={product.id || product._id}>

                                <Card className="product-card hover-card">
                                    <div className="product-thumbnail">
                                        <Card.Img variant="top" src={product.thumbnail} className="img" />
                                    </div>

                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <div className="mb-3">
                                            <div>Category: {product.category}</div>
                                            <div>
                                                Price: ₹{product.discountPrice}
                                                <span className="original_price">₹{product.originalPrice}</span>
                                                <span className="discount_percentage">
                                                    {Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)}% off
                                                </span>
                                            </div>
                                            <div>Rating: {product.rating} ★</div>
                                        </div>
                                        <Link to={`/product/${product._id}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                            View Details
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
};

export default SearchPage; 