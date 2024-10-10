import React from 'react';
import '../styles/categories.css';

const categories = [
  { name: "Mobiles & Tablets", icon: "/images/mobiles-icon.png" },
  { name: "TVs & Appliances", icon: "/images/tvs-icon.png" },
  { name: "Electronics", icon: "/images/electronics-icon.png" },
  { name: "Fashion", icon: "/images/fashion-icon.png" },
  { name: "Beauty", icon: "/images/beauty-icon.png" },
  { name: "Home & Kitchen", icon: "/images/home-kitchen-icon.png" },
  { name: "Furniture", icon: "/images/furniture-icon.png" },
];

const Categories = () => {
  return (
    <div className="categories-section">
      <div className="categories-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-btn">
              <img src={category.icon} alt={category.name} className="category-icon" />
              <p>{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
