const bookModel = require('../../model/msql-model/bookModel');


// Get a book by ID
async function getBookByIdController(req, res) {
    try {
        const book = await bookModel.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getBookByIdController
}