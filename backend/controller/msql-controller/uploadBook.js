const bookModel = require('../../model/msql-model/bookModel');
const uploadBookPermission = require('../../helpers/permission');

// Upload a new book
async function uploadBookController(req, res) {
    try {
        const sessionUserId = req.userId;

        // Check if the user has permission to upload a book (admin check)
        const hasPermission = await uploadBookPermission(sessionUserId);
        if (!hasPermission) {
            throw new Error("Permission denied. Only admins can upload books.");
        }

        // Get the book details from the request body
        const { title, author, genre, publish_date, isbn, price, stock_count, publisher, language, cover_image_url } = req.body;

        // Validate required fields
        if (!title || !author || !isbn || !price) {
            throw new Error("Missing required fields: title, author, isbn, and price");
        }

        // Create a new book entry object
        const newBook = {
            title,
            author,
            genre,
            publish_date,
            isbn,
            price,
            stock_count,
            publisher,
            language,
            cover_image_url
        };

        // Insert the new book into the database
        const bookId = await bookModel.createBook(newBook);

        // Return success response
        res.status(201).json({
            message: 'Book uploaded successfully',
            error: false,
            success: true,
            data: { bookId }
        });
    } catch (err) {
        // Handle errors
        res.status(400).json({
            message: err.message || 'Failed to upload book',
            error: true,
            success: false
        });
    }
}

module.exports = {
    uploadBookController
};
