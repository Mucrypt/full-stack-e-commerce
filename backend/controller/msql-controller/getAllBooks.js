const bookModel = require('../../model/msql-model/bookModel');



// Get all books
async function getAllBooksController(req, res) {
    try {
        const books = await bookModel.getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    
    
    getAllBooksController
};