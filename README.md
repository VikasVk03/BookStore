# BookStore

A full‑stack BookStore web application — frontend (React/Vite) + backend (Express.js/Node.js) API + database.

## Table of Contents

- [BookStore](#bookstore)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Installation \& Setup](#installation--setup)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
    - [Backend Endpoints](#backend-endpoints)
    - [Frontend Routes](#frontend-routes)
  - [Environment Variables](#environment-variables)
  - [Future Enhancements](#future-enhancements)
  - [License](#license)

---

## Project Overview

This BookStore application enables users to browse, search, view books, and (optionally) manage their book collection. It uses a **frontend** built with React (via Vite) for the UI, and a **backend** built with Express.js (Node.js) providing REST API endpoints. A database (MongoDB or similar) stores the books data.


## Features

* View a list of books
* Search books by title/author/category
* View details of individual books
* Add, update, delete books (admin or authenticated user)
* User authentication (register/login)
* Responsive UI

## Tech Stack

* **Frontend:** React + Vite + JavaScript
* **Backend:** Node.js + Express.js
* **Database:** MongoDB + Mongoose ORM
* **Authentication:** JWT (JSON Web Tokens)
* **Styling:** CSS / or CSS‑framework (mention if used)
* **Others:** Fetch(frontend) and morgan (backend) for HTTP,  React Router for routing

## Project Structure

```
BookStore/
├── backend/         # Express.js API 
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
├── frontend/        # React (Vite) app
|   ├──public/
│   ├── src/
|   |   ├── admin/
|   |   ├── assets/
|   |   ├── auth/
│   │   ├── components/
│   │   ├── home
│   │   ├── routers/
|   |   ├── shop/
│   │   ├── App.jsx
│   │   └── main.jsx
|   ├── index.html
│   └── package.json
└── .gitignore
```

## Installation & Setup

### Prerequisites

* Node.js (v14+ or v16+)
* npm or yarn
* MongoDB instance running locally or via cloud (Atlas)

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create an `.env` file (see [Environment Variables](#environment-variables)).
4. Start the backend server:

   ```bash
   npm run dev
   ```

   (or `node server.js` if a script is provided)

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create any required `.env` (if frontend needs environment vars).
4. Start the frontend development server:

   ```bash
   npm run dev
   ```
5. The app should open in your browser (commonly at `http://localhost:5173` or `http://localhost:3000` depending on Vite config).

## Running the Application

* Ensure MongoDB is running and the backend has correct DB connection.
* Run backend server (e.g., `http://localhost:5000`).
* Run frontend server (e.g., `http://localhost:3000` or `5173`).
* Open browser to frontend URL.
* Use the UI to register/login (if auth is implemented), view books, etc.
* You can test API endpoints using Postman or similar tools.

## API Endpoints

### Backend Endpoints

**Authentication**

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Login and receive JWT

**Books (public & protected routes)**

* `GET /api/books` – Get all books (supports query params for filtering/search)
* `GET /api/books/:id` – Get a book by ID
* `POST /api/books` – Create a new book (admin only)
* `PUT /api/books/:id` – Update book by ID (admin only)
* `DELETE /api/books/:id` – Delete book by ID (admin only)

**Cart / Wishlist (if implemented)**

* `GET /api/wishlist` – Get the user’s wishlist (authenticated)
* `POST /api/wishlist/:bookId` – Add a book to wishlist
* `DELETE /api/wishlist/:bookId` – Remove book from wishlist

### Frontend Routes

* `/` – Home page (list of books)
* `/book/:id` – Book details page
* `/login` – Login form
* `/register` – Register form
* `/admin` – Admin dashboard (if provided)
* `/wishlist` – User’s wishlist page

## Environment Variables

**Backend** (`backend/.env`):

```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

**Frontend** (`frontend/.env` maybe `VITE_` prefixed):

```
VITE_API_URL=http://localhost:5000/api
```

## Future Enhancements

* Add pagination to book listing
* Improve search/filter by multiple criteria (author, ratings, category)
* Add user roles (admin vs regular) and role-based UI
* Add book reviews/ratings
* Deploy frontend & backend (Heroku, Vercel, AWS)
* Add unit/integration tests

## License

MIT License © 2025

---

**Thank you for checking out this project!**
Feel free to clone, explore, and make suggestions or improvements.
