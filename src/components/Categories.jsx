import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
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

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName.toLowerCase()}`); // Navigate to the category page
  };

  return (
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
  );
};

export default Categories;
