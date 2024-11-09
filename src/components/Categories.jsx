import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName.toLowerCase()}`); // Navigate to the category page
  };

  return (
    <div className="position-relative">
      {loading ? (
        <div className='d-flex justify-content-center my-4'>
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div className='fs-5 mx-2'>Loading Categories...</div>
        </div>
      ) : (
        <Container fluid className="categories-section">
          <Row className="justify-content-center m-0">
            {categories.map((category, index) => (
              <Col key={category._id || index} xs={6} sm={4} md={3} lg={1} className="category-item mx-3">
                <div className="category-btn" onClick={() => handleCategoryClick(category.name)}>
                  <img src={category.imageUrl} alt={category.name} className="category-icon" />
                  <p>{category.name}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Categories;
