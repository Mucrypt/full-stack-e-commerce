const bookModel = require('../../model/msql-model/bookModel');

// Update a book by ID
async function updateBookController(req, res) {
    try {
        await bookModel.updateBook(req.params.id, req.body);
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    updateBookController
};