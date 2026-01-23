# Convers - Real-Time Chat Application

A modern full-stack real-time chat application built with React, Node.js, Express, and Socket.io.

## Features

- Real-time messaging with Socket.io
- User authentication (JWT-based)
- Secure password hashing with bcrypt
- Image upload support via Cloudinary
- MongoDB for data persistence
- Cookie-based session management
- Responsive React frontend with Vite

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **cookie-parser** - Cookie parsing middleware

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account (for image uploads)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Convers-Real-Time-Chat-App
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

## Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Running the Application

### Start the Backend Server

```bash
cd Backend
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd Frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is in use)

## Project Structure

```
Convers-Real-Time-Chat-App/
├── Backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── lib/           # Utility functions
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── .env               # Environment variables
└── Frontend/
    ├── public/            # Static assets
    ├── src/
    │   ├── assets/        # Images, icons
    │   ├── App.jsx        # Main App component
    │   ├── App.css        # App styles
    │   ├── main.jsx       # React entry point
    │   └── index.css      # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## API Endpoints

The backend exposes RESTful APIs for authentication and user management:

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- Socket.io connection for real-time messaging

## Development

### Backend Development

The backend uses `nodemon` for hot reloading during development.

```bash
cd Backend
npm run dev
```

### Frontend Development

The frontend uses Vite for fast development with HMR.

```bash
cd Frontend
npm run dev
```

### Building for Production

```bash
cd Frontend
npm run build
```

The production build will be in the `Frontend/dist` directory.

