const bookModel = require('../../model/msql-model/bookModel');

// Delete a book by ID
async function deleteBookController(req, res) {
    try {
        await bookModel.deleteBook(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    deleteBookController
};
