const jwt = require('jsonwebtoken'); 
const { promisify } = require('util');

const authToken = async (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies?.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                message: "Please login to access ",
                error: true,
                success: false
            });
        }

        // Verify the token (promisify for async/await usage)
        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET_KEY);

        // Attach the decoded user ID to the request for future use
        req.userId = decoded?._id;

        next(); // Proceed to the next middleware or route handler

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired, please login again",
                error: true,
                success: false
            });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token, please login again",
                error: true,
                success: false
            });
        }

        // Log any unexpected server errors
        console.error("Server error:", err.message);
        return res.status(500).json({
            message: "Server error, please try again later",
            error: true,
            success: false
        });
    }
};

module.exports = authToken;