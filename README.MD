# 📚 Book Management REST API

A simple RESTful API built with **Node.js, Express, and MongoDB** that allows users to manage books (Create, Read, Update, Delete) — with **JWT authentication** and clean validation!

---

## 🚀 Features

✅ User Registration with unique **username** and **email**  
✅ Secure Login with **JWT Token** generation  
✅ Password hashing using **bcrypt**  
✅ Protected Book CRUD routes — **authentication required**  
✅ Supports **optional guest access** (skipAuth flag)  
✅ Clean error handling with proper HTTP status codes  
✅ Input validation using **validator.js**  

---

## 💡 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- validator (input validation)

---

## 📦 Endpoints

### Authentication

| Method | Route              | Description                  |
|--------|---------------------|-------------------------------|
| POST   | `/api/register`     | Register new user            |
| POST   | `/api/login`        | Login and receive JWT Token  |

---

### Book Management (Protected)

| Method | Route                   | Description          |
|--------|--------------------------|-----------------------|
| GET    | `/api/books`             | Get all books         |
| GET    | `/api/books/:id`         | Get book by ID        |
| POST   | `/api/books`             | Create a new book     |
| PUT    | `/api/books/:id`         | Update a book         |
| DELETE | `/api/books/:id`         | Delete a book         |

🛡️ All routes require a valid JWT token in headers:  
`Authorization: Bearer <token>`

---

### ⚡ Skip Authentication (Dev Mode)

You can pass the `skipAuth=true` query parameter to bypass JWT verification:

GET /api/books?skipAuth=true
