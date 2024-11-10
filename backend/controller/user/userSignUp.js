const userModel = require('../../model/userModel');
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const user = await userModel.findOne({ email });
        console.log("user:", user);

        if (user) {
            // Return a specific error response if the user exists
            return res.status(400).json({
                message: 'User already exists',
                error: true,
                success: false
            });
        }

        // Validate required fields
        if (!email) throw new Error('Email is required');
        if (!password) throw new Error('Password is required');
        if (!name) throw new Error('Name is required');

        // Hash password
        const salt = await bcrypt.genSalt(10);  // Use asynchronous bcrypt.genSalt
        const hashedPassword = await bcrypt.hash(password, salt); // Use asynchronous bcrypt.hash

        if (!hashedPassword) throw new Error('Error in hashing password');

        // Prepare user data for saving
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashedPassword
        }

        // Save user
        const userData = new userModel(payload);
        const savedUser = await userData.save(); // Await the save

        if (!savedUser) throw new Error('Error in saving user');

        // Respond with success
        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: 'User created successfully'
        });

    } catch (error) {
        // Handle all other errors
        res.status(500).json({
            message: error.message,  // Send error message, not the entire error object
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
