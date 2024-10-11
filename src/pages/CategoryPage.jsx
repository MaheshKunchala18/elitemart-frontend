import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { products } from '../data/data'; // Import products data
import { useParams } from 'react-router-dom';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
    const { categoryName } = useParams(); // Get category from URL params
    
    // Filter products based on selected category
    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase() === (categoryName || '').toLowerCase()
    );

    return (
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
                                    <div>Price: ₹{product.price}</div>
                                    <div>Rating: {product.rating} ★</div>
                                </div>
                                <Link to={`/product/${product.id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CategoryPage;
