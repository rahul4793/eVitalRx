# E-Commerce API

# Deployed Link -> https://evitalrx.onrender.com
# Testing Screenshots -> https://docs.google.com/document/d/1O3CqWLQm601UKPITbv8reYAi1TiQCKAVpdZXfZAbjuc/edit?usp=sharing
---

## Features

- **Signup**: Register a new user.
- **Login**: Authenticate and log in the user.
- **Get/View Profile**: Fetch the user's profile.
- **Add to Cart**: Add products to the user's cart.
- **Checkout**: Checkout the cart by deducting stock.
- **Place Order**: Place an order after checkout and clear the cart.
- **Logout**: Log out the user.

---

## Prerequisites

Before setting up the project, ensure that the following are installed:

1. **Node.js** 
2. **MongoDB** - Ensure MongoDB is running locally or on a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. **Postman** API testing tool.

---
Before running it locally, change or create a .env file in root directory:

1. **PORT=5000** 
2. **MONGO_URI=your_url** 
3. JWT_SECRET=your_jwt_secret
---
## Run locally 
```bash
git clone <repository-url>
cd ecommerce-app/backend
npm install

npm start
````


# API Endpoints

## 1. **POST** `/api/auth/signup`
- **Description**: Register a new user.
- **Request Body**:
    ```json
    {
      "email": "rahul@gmail.com.com",
      "password": "password",
      "name": "Rahul Gupta"
    }
    ```
- **Response**:
    ```json
    {
      "success": true,
      "message": "User registered successfully"
    }
    ```

---

## 2. **POST** `/api/auth/login`
- **Description**: Authenticate and log in the user.
- **Request Body**:
    ```json
    {
      "email": "rahul@gmail.com.com",
      "password": "password"
    }
    ```
- **Response**:
    ```json
    {
      "success": true,
      "token": "your_jwt_token"
    }
    ```

---

## 3. **GET** `/api/user/profile`
- **Description**: Fetch the user's profile.
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Response**:
    ```json
    {
      "success": true,
      "user": {
        "email": "user@example.com",
        "name": "John Doe"
      }
    }
    ```

---

## 4. **POST** `/api/cart`
- **Description**: Add a product to the cart.
- **Request Body**:
    ```json
    {
      "productId": "677d39a2462387909584a5cc",
      "quantity": 2
    }
    ```
- **Response**:
    ```json
    {
      "success": true,
      "cart": {
        "user": "677d39a2462387909584a5cc",
        "products": [
          {
            "product": "677d39a2462387909584a5cc",
            "quantity": 2
          }
        ]
      }
    }
    ```

---

## 5. **POST** `/api/cart/checkout`
- **Description**: Proceed to checkout by reducing the stock of the product and generating a bill.
- **Request Body**:
    ```json
    {
      "productId": "677d39a2462387909584a5cc",
      "quantity": 2
    }
    ```
- **Response**:
    ```json
    {
      "success": true,
      "message": "Checkout successful, bill generated"
    }
    ```

---

## 6. **POST** `/api/order`
- **Description**: Place an order after checkout.
- **Request Body**:
    ```json
    {
      "cartId": "677d3fa9b5f0af5020ea7d80",
      "totalAmount": 500
    }
    ```
- **Response**:
    ```json
    {
      "success": true,
      "order": {
        "user": "677d39a2462387909584a5cc",
        "items": [
          {
            "product": "677d39a2462387909584a5cc",
            "quantity": 2
          }
        ],
        "total": 500
      }
    }
    ```

---

## 7. **POST** `/api/auth/logout`
- **Description**: Log out the user.
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Response**:
    ```json
    {
      "success": true,
      "message": "Logged out successfully"
    }
    ```

---



