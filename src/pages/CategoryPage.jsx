import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import axios from 'axios';
import '../styles/CategoryPage.css';


const CategoryPage = () => {
    const { categoryName } = useParams();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);


    let filteredProducts = [...products]
        .map((product) => ({
            ...product,
            discountPercentage: Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100),
        }))

    if (categoryName === 'top offers') {
        filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage); // Sort in descending order
    }
    else {
        filteredProducts = filteredProducts.filter((product) =>
            product.category.toLowerCase() === (categoryName || '').toLowerCase()
        );
    }


    const handleCategoryClick = (category) => {
        navigate(`/category/${category.toLowerCase()}`);
    };

    return (
        <>
            <NavigationBar />
            <Container className="pt-5">
                <Nav className="category-bar justify-content-center mt-5 mb-4">
                    {categories.map((category, index) => (
                        <Nav.Item key={category._id || index} className="category-item mx-3">
                            <div
                                onClick={() => handleCategoryClick(category.name)}
                                className={`category-link ${category.name.toLowerCase() === categoryName?.toLowerCase() ? 'active' : ''
                                    }`}
                            >
                                {category.name}
                            </div>
                        </Nav.Item>
                    ))}
                </Nav>

                {categoryName ? <h2 className="my-5 pt-4">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products</h2> : null}
                <Row>
                    {filteredProducts.map((product, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="product-card hover-card">
                                <Card.Img variant="top" src={product.imageUrl} className="img" />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <div className="mb-3">
                                        {categoryName === 'top offers' ? <div>Category: {product.category}</div> : ''}
                                        <div>
                                            Price: ₹{product.discountPrice}
                                            <span className="original_price">₹{product.originalPrice}</span>
                                            <span className="discount_percentage">{product.discountPercentage}% off</span>
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