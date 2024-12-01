# 🛒 **EliteMart**


## Links
[Live Demo](https://elitemartwebapp.netlify.app/) 🌐 |
[Frontend Repository](https://github.com/MaheshKunchala18/elitemart-frontend)  <img src="https://img.icons8.com/material-outlined/24/000000/github.png" /> |
[Backend Repository](https://github.com/MaheshKunchala18/elitemart-backend) <img src="https://img.icons8.com/material-outlined/24/000000/github.png" />



## **Table of Contents 📋**

1. [🎯 Project Overview](#project-overview)
2. [✨ Features](#features)
3. [🛠 Tech Stack](#tech-stack)
4. [⚙️ Installation and Setup](#️installation)
5. [🚀 Usage](#usage)
6. [🔗 API Endpoints](#api-endpoints)
7. [📂 Folder Structure](#folder-structure)
8. [🤝 Contributing](#contributing)
9. [📬 Contact](#contact)



<h2 id="project-overview"> <strong>🎯 Project Overview</strong> </h2>

EliteMart is a responsive and dynamic e-commerce platform that offers a seamless shopping experience. It features a wide variety of products categorized into sections like Mobiles, Electronics, Fashion, Furniture, and more. The platform includes functionalities such as secure user authentication, interactive UI with animations, and efficient category-based product navigation.

This project aims to replicate real-world e-commerce platforms like Amazon or Flipkart by focusing on responsiveness, performance, and a visually appealing user experience.



<h2 id="features"> <strong>✨ Features</strong> </h2>

- **Dynamic Home Page**: Displays top offers and featured products(best-rated items) across multiple categories to enhance user engagement.
- **User Authentication**: Secure signup and login functionalities with password encryption, ensuring user data safety.
- **Product Management**: Allows users to browse detailed product information and manage their shopping preferences.
- **Responsive Design**: Fully optimized for mobile and desktop devices using React-Bootstrap, offering a seamless shopping experience across all screen sizes.
- **Product Images**: Supports multiple product images, including a thumbnail for quick previews and detailed views for in-depth exploration.
- **Category Navigation**: Effortlessly filter products by category using a fixed category bar.
- **Interactive Features**: Product rating, discount highlights, and smooth animations powered by Framer Motion for an engaging user experience.
- **Cart Page**: Allows users to add, update, or remove products, displaying real-time totals, including discount calculations.
- **Orders Page**: Provides a comprehensive view of past and current orders, including product details, quantities, total amount saved, and order status(order id and order date) for seamless tracking.
- **Notification System**: Displays real-time toast messages for user actions such as successful login/signup, invalid credentials, empty cart warnings, or product additions to the cart.
- **Search Functionality**: Allows users to search for products, displaying matched results in a dropdown for quick access.



<h2 id="tech-stack"> <strong>🛠 Tech Stack</strong> </h2>

### Frontend

- **React.js**: A versatile JavaScript library for building dynamic user interfaces.
- **React Router DOM**: Handles navigation and routing between different pages in the application.
- **React Bootstrap**: Offers responsive pre-styled components for a seamless UI design.
- **Bootstrap**: A CSS framework providing responsive grid systems and design utilities.
- **Font Awesome & React Font Awesome**: Adds scalable and customizable icons for a polished UI.
- **Framer Motion**: Provides animations and smooth transitions for enhanced user interactions.
- **Axios**: Manages API requests to fetch and send data between frontend and backend.
- **React Toastify**: Displays customizable toast notifications for user actions.
- **React Icons**: Supplies a variety of customizable icons for enhancing visuals.
- **Testing Library (React, Jest-DOM, User Event)**: Facilitates component testing to maintain code quality.
- **Web Vitals**: Tracks performance metrics to optimize user experience.

### Backend

- **Node.js**: The runtime environment for running JavaScript on the server-side.
- **Express.js**: A minimalist web application framework for building RESTful APIs and handling server-side logic.
- **MongoDB**: A NoSQL database that stores and manages data such as user information, products, cart, orders, and categories.
- **Mongoose**: A MongoDB object data modeling (ODM) library for defining schemas and interacting with the database.
- **Bcrypt**: Ensures secure password storage by hashing and salting user credentials.
- **Cors**: Enables secure cross-origin requests to allow communication between frontend and backend servers.
- **Body-Parser**: Parses incoming request bodies for easier data handling.
- **Dotenv**: Loads environment variables from a .env file to securely manage sensitive configurations.
- **Nodemon**: Automatically restarts the server during development whenever file changes are detected.

**Note**: The backend uses the ESM module type, enabling the use of "import" statements instead of "require". This aligns the backend with the modern JavaScript syntax, similar to what is used in the React.js frontend.

### Testing

- **Jest & React Testing Library**: Used for unit and integration testing to ensure the application functions as expected.



<h2 id="️installation"> <strong> ⚙️ Installation and Setup</strong> </h2>

### **Prerequisites**

- Node.js (v14.x or higher)
- MongoDB (local instance or MongoDB Atlas)
- NPM or Yarn

### **Installation**

1. **Backend Setup:**
   - Clone the repository:
     ```bash
     git clone https://github.com/MaheshKunchala18/elitemart-backend
     ```
   - Navigate to the backend directory:
     ```bash
     cd elitemart-backend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add your environment variables. Depending on your setup, you can use either MongoDB Atlas or a local MongoDB instance:
      - **For MongoDB Atlas:**
        ```bash
        MONGODB_URI=your_mongodb_uri
        PORT=3001
        ```
      - **For Local MongoDB (Compass):**
        ```bash
        MONGODB_URI=mongodb://localhost:27017/your_database_name
        PORT=3001
        ```
   - Start the backend server:
     ```bash
     npm start
     ```

2. **Frontend Setup:**
   - Clone the repository:
     ```bash
     git clone https://github.com/MaheshKunchala18/elitemart-frontend
     ```
   - Navigate to the frontend directory:
     ```bash
     cd elitemart-frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the frontend directory and add your environment variables. Depending on whether your backend is deployed or running locally, you can specify the backend URL accordingly:
      - **If the backend is deployed:**
        ```bash
        REACT_APP_BACKEND_URL=your_backend_url
        ```
      - **If the backend is running locally:**
        ```bash
        REACT_APP_BACKEND_URL=http://localhost:3001
        ```
   - Start the frontend server:
     ```bash
     npm start
     ```

3. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.



<h2 id="usage"> <strong>🚀 Usage</strong> </h2>

1. **User Registration & Login:**
    - Create a new account or log in to your existing account to access personalized features.
    - User authentication is handled securely with bcrypt.

2. **Browsing & Filtering Products:**
    - View products across multiple categories like Mobiles, TVs, Furniture, etc.
    - Use the category navigation to filter products by different categories or apply search functionality to find specific products.

3. **Managing Cart:**
    - Add products to your cart for a seamless checkout experience.
    - View cart details, update item quantities, or remove products from the cart as needed.

4. **Placing Orders:**
    - Review your cart and proceed to place an order.
    - Users can view their past orders and their statuses for easy order management.

5. **Notifications:**
    - Receive success or error messages, such as successful login, product added to cart, or cart being empty, via toast notifications.

6. **Viewing Product Details:**
    - Click on product items to view detailed information, including images, prices, ratings, and descriptions.



<h2 id="api-endpoints"> <strong>🔗 API Endpoints</strong> </h2>

### **Authentication**
- **POST /signup**: Register a new user.
- **POST /login**: Authenticate user and start a session.

### **Categories**
- **GET /categories**: Get the list of all product categories.

### **Products**
- **GET /products**: Get all available products.
- **GET /products/:id**: Get a specific product by ID.
- **POST /products**: Create a new product.
- **PUT /products/:id**: Update a product by ID.
- **DELETE /products/:id**: Delete a product by ID.

### **Cart**
- **POST /cart**: Add a product to the cart.
- **GET /cart/:userId**: Get the user's cart by user ID.
- **DELETE /cart**: Remove a product from the cart.
- **POST /cart/clear**: Clear all items from the user's cart.

### **Orders**
- **POST /orders**: Place a new order.
- **GET /orders/:userId**: Get the list of orders placed by a user.



<h2 id="folder-structure"> <strong>📂 Folder Structure</strong> </h2>

```bash
EliteMart/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── node_modules/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── vercel.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
```



<h2 id="contributing"> <strong> 🤝 Contributing</strong> </h2>

Contributions are welcome! Please fork this repository and submit a pull request for any features, fixes, or suggestions.



<h2 id="contact"> <strong>📬 Contact</strong> </h2>

For any inquiries or feedback, please contact:

**Mahesh Kunchala**
- LinkedIn: [Mahesh Kunchala](https://linkedin.com/in/mahesh-kunchala-23854624b/)  
- GitHub: [Mahesh Kunchala](https://github.com/MaheshKunchala18)

