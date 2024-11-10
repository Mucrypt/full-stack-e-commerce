const express = require('express');
const router = express.Router();
const uploadBookController = require('../controller/msql-controller/uploadBook');  // Updated path
const getAllBooksController = require('../controller/msql-controller/getAllBooks');  // Updated path
const updateBookController = require('../controller/msql-controller/updateBook');  // Updated path
const deleteBookController = require('../controller/msql-controller/deleteBook');  // Updated path
const getBookByIdController = require('../controller/msql-controller/getBookById');  // Updated path
const authToken = require('../middleware/authToken');

// Book Routes


router.get('/books', getAllBooksController.getAllBooksController);
router.get('/books/:id', getBookByIdController.getBookByIdController);
router.put('/books/:id', updateBookController.updateBookController);
router.delete('/books/:id', deleteBookController.deleteBookController);
// Backend book routes
router.post('/upload-book',authToken, uploadBookController.uploadBookController);  


module.exports = router;
