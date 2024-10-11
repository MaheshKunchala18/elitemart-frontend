import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import { categories } from '../data/data'; // Adjust path if needed
import '../styles/categories.css';

const Categories = () => {
  return (
    <Container fluid className="categories-section">
      <Row className="justify-content-center m-0">
        {categories.map((category, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={1} className="category-item mx-3">
            <div className="category-btn">
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
