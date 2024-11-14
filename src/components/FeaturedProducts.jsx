// import React, { useState, useEffect } from 'react';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import '../styles/FeaturedProducts.css';

// const FeaturedProducts = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [products, setProducts] = useState([]);
//     const itemsPerPage = 4;

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     // Sort products by rating in descending order
//     const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

//     // Calculate the currently displayed products
//     const currentProducts = sortedProducts.slice(currentIndex, currentIndex + itemsPerPage);

//     // Handle navigation
//     const goToPrevious = () => {
//         if (currentIndex > 0) setCurrentIndex(currentIndex - itemsPerPage);
//     };

//     const goToNext = () => {
//         if (currentIndex + itemsPerPage < sortedProducts.length) setCurrentIndex(currentIndex + itemsPerPage);
//     };

//     return (
//         <div className="featured-products-container">
//             <h2>Featured Products</h2>

//             <Container fluid className="d-flex pt-5">
//                 <Button className="navigation-buttons" onClick={goToPrevious} disabled={currentIndex === 0}>
//                     <FontAwesomeIcon icon={faArrowLeft} />
//                 </Button>
//                 <Row>
//                     {currentProducts.map((product, index) => (
//                         <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
//                             <Card className="product-card hover-card">
//                                 <Card.Img variant="top" src={product.imageUrl} className="img" />
//                                 <Card.Body>
//                                     <Card.Title>{product.name}</Card.Title>
//                                     <div className="mb-3">
//                                         <div>Category: {product.category}</div>
//                                         <div>
//                                             Price: ₹{product.discountPrice}
//                                             <span className="original_price">₹{product.originalPrice}</span>
//                                             <span className="discount_percentage">{product.discountPercentage}% off</span>
//                                         </div>
//                                         <div>Rating: {product.rating} ★</div>
//                                     </div>
//                                     <Link to={`/product/${product._id}`} className="btn btn-primary">
//                                         View Details
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>

//                 <Button className="navigation-buttons" onClick={goToNext} disabled={currentIndex + itemsPerPage >= sortedProducts.length}>
//                     <FontAwesomeIcon icon={faArrowRight} />
//                 </Button>

//             </Container>
//         </div>
//     );
// };

// export default FeaturedProducts;









import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Spinner, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/FeaturedProducts.css';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <Container fluid>
            <CarouselWithControls items={products} title="Featured Products" loading={loading} />
        </Container>
    );
};




const CarouselWithControls = React.memo(({ items, title, loading }) => {
    const [index, setIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(3);

    // Update itemsToShow based on screen width
    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth < 700) {
                setItemsToShow(1);
            } else if (window.innerWidth < 1000) {
                setItemsToShow(2);
            } else if (window.innerWidth < 1400) {
                setItemsToShow(3);
            } else {
                setItemsToShow(4);
            }
        };

        // Set initial itemsToShow
        updateItemsToShow();
        // Add resize event listener
        window.addEventListener('resize', updateItemsToShow);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const next = () => {
        setIndex((prevIndex) => (prevIndex + itemsToShow) % items.length);
    };

    const prev = () => {
        setIndex((prevIndex) => (prevIndex - itemsToShow + items.length) % items.length);
    };

    const discountPercentage = (originalPrice, discountPrice) => {
        return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    };

    return (
        <div className="product-section">
            <h2 className="my-5 mx-5">{title}</h2>

            <div className="position-relative">
                {loading ? (
                    <div className='d-flex justify-content-center my-4'>
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <div className='fs-5 mx-2'>Loading Products...</div>
                    </div>
                ) : (
                    <>
                        <Button
                            variant="light"
                            className="position-absolute top-50 start-0 translate-middle-y"
                            onClick={prev}
                            style={{ zIndex: 1 }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>

                        <Carousel interval={null} className="carousel-container" activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
                            {items.map((product, idx) => (
                                <Carousel.Item className='mx-4 carousel-item' key={product._id}>
                                    <Row>
                                        {[...Array(itemsToShow)].map((_, offset) => {
                                            const productIndex = (idx + offset) % items.length;
                                            return (
                                                <Col className='col-cont mx-1 px-0' key={productIndex}>
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.8 }}
                                                    >
                                                        <Card className="mx-1 product-card hover-card">
                                                            <Card.Img variant="top" src={items[productIndex].thumbnail} className="img" />
                                                            <Card.Body>
                                                                <Card.Title>{items[productIndex].name}</Card.Title>
                                                                <div className="mb-3">
                                                                    <div>Category: {items[productIndex].category}</div>
                                                                    <div>
                                                                        Price: ₹{items[productIndex].discountPrice}
                                                                        <span className="original_price">₹{items[productIndex].originalPrice}</span>
                                                                        <span className="discount_percentage">{discountPercentage(items[productIndex].originalPrice, items[productIndex].discountPrice)}% off</span>
                                                                    </div>
                                                                    <div>Rating: {items[productIndex].rating} ★</div>
                                                                </div>
                                                                <Link to={`/product/${items[productIndex]._id}`} className="btn btn-primary">
                                                                    View Details
                                                                </Link>
                                                            </Card.Body>
                                                        </Card>
                                                    </motion.div>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>

                        <Button
                            variant="light"
                            className="position-absolute top-50 end-0 translate-middle-y"
                            onClick={next}
                            style={{ zIndex: 1 }}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
});


export default FeaturedProducts;
