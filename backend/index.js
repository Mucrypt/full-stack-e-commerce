// Main server setup for the e-commerce backend application.
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { connectDB } = require('./config/db');

// Import route handlers
const router = require('./routes');           // MongoDB routes (users, products)
const bookRoutes = require('./routes/bookRoutes');  // MySQL routes (books)
const webhooks = require('./controller/order/webhooks'); // Stripe webhook handler

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS with specific origin for frontend communication
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Allow only frontend URL from environment variable
    credentials: true                  // Enable credentials (cookies, authorization headers)
}));

// Parse cookies for managing session information
app.use(cookieParser());

// Parse JSON payloads for all non-Stripe routes
app.use(express.json());

// Route for Stripe webhooks - raw body parsing is critical for signature verification
app.post('/api/webhooks', express.raw({ type: 'application/json' }), webhooks);

// Define main routes for MongoDB resources (users, products)
app.use("/api", router);

// Define MySQL-based routes (books)
app.use("/api", bookRoutes);

// Connect to databases and start server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('MongoDB and MySQL connections established');
        });
    })
    .catch((err) => {
        console.error('Failed to connect to databases:', err);
        process.exit(1);  // Exit process if database connections fail
    });

// Optional: Define custom error-handling middleware here if needed
