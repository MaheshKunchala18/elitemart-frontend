import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavigationBar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import '../styles/CategoryPage.css';


const CategoryPage = () => {
    const { categoryName } = useParams();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            setLoadingCategory(false);
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoadingProduct(false);
        };

        fetchCategories();
        fetchProducts();
    }, []);


    let filteredProducts = [...products];


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
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Container className="pt-5">

                {loadingCategory ? (
                    <div className='d-flex justify-content-center mt-5'>
                        <Spinner animation="grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <div className='fs-5 mx-2'>Loading Categories...</div>
                    </div>
                ) : (
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
                )}

                {categoryName ? <h2 className="my-5 pt-4">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products</h2> : null}

                {loadingProduct ? (
                    <div className='d-flex justify-content-center mt-5'>
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <div className='fs-5 mx-2'>Loading Products...</div>
                    </div>
                ) : (
                    <Row>
                        {filteredProducts.map((product, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container >
        </>
    );
};


export default CategoryPage;