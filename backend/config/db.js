const mysql = require('mysql2/promise'); // Use 'mysql2/promise' for async/await support
const mongoose = require('mongoose');

// MySQL Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: 3306,
    connectTimeout: 60000
});

// MongoDB Connection
async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // No need for deprecated options in newer versions
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit on failure
    }
}

// MySQL Connection with Pool
const connectMySQL = async () => {
    try {
        const connection = await pool.getConnection(); // Get connection from pool
        console.log('MySQL connected');
        connection.release(); // Release connection back to the pool
    } catch (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1); // Exit on failure
    }
};

// Combined function to connect both databases
async function connectDB() {
    await connectMongoDB(); // Connect to MongoDB
    await connectMySQL(); // Connect to MySQL
}

module.exports = { pool, connectDB };
