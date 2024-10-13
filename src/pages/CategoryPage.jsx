import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CategoryPage.css';
import NavigationBar from '../components/Navbar';

const CategoryPage = () => {
    const { categoryName } = useParams(); // Get category from URL params
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
                setProducts(response.data); // Assuming the response returns an array of products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on selected category
    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase() === (categoryName || '').toLowerCase()
    );

    return (
        <>
            <NavigationBar />
            <Container>
                {categoryName ? <h2 className='my-5' >{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products</h2> : null}
                <Row>
                    {filteredProducts.map((product, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="product-card hover-card">
                                <Card.Img variant="top" src={product.imageUrl} className='img' />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <div className='mb-3'>
                                        <div>
                                            Price: ₹{product.discountPrice}
                                            <span className='original_price'>₹{product.originalPrice}</span>
                                        </div>
                                        <div>Rating: {product.rating} ★</div>
                                    </div>
                                    <Link to={`/product/${product._id}`} className="btn btn-primary">
                                        View Details
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default CategoryPage;
