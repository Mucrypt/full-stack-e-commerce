const bcrypt = require('bcryptjs');
const userModel = require('../../model/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
                error: true,
                success: false
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Compare the provided password with the stored hashed password
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({
                message: "Incorrect password, please try again",
                error: true,
                success: false
            });
        }

        // Generate JWT token if password is correct
        const tokenData = {
            _id: user._id,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
            expiresIn: '8h' // Token valid for 8 hours
        });

        // Cookie options
        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only set secure flag in production (HTTPS)
            sameSite: 'Strict', // Helps prevent CSRF attacks
            maxAge: 8 * 60 * 60 * 1000 // Cookie expires in 8 hours
        };

        // Set the token in a cookie and respond
        res.cookie('token', token, tokenOptions).status(200).json({
            message: "Login successful",
            token: token, // Optionally return the token in the response body
            success: true,
            error: false
        });

    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({
            message: err.message || "Server error, please try again later",
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;
