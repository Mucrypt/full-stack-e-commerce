//backend/model/msql-model/bookModel.js

const { pool } = require('../../config/db'); // Ensure the pool is correctly imported

// Insert a new book
async function createBook(book) {
    const { title, author, genre, publish_date, isbn, price, stock_count, publisher, language, cover_image_url } = book;
    const query = `
        INSERT INTO Books (title, author, genre, publish_date, isbn, price, stock_count, publisher, language, cover_image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [title, author, genre, publish_date, isbn, price, stock_count, publisher, language, cover_image_url];
    
    try {
        const [result] = await pool.execute(query, values);
        return result.insertId; // Return the ID of the newly inserted book
    } catch (err) {
        throw new Error('Failed to create book: ' + err.message);
    }
}

// Fetch all books
async function getAllBooks() {
    console.log(pool); // Check if pool is defined here
    const query = 'SELECT * FROM Books';
    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (err) {
        throw new Error('Failed to fetch books: ' + err.message);
    }
}

// Fetch a single book by ID
async function getBookById(id) {
    const query = 'SELECT * FROM Books WHERE id = ?';
    try {
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    } catch (err) {
        throw new Error('Failed to fetch book: ' + err.message);
    }
}

// Update book details
async function updateBook(id, book) {
    const { title, author, genre, publish_date, isbn, price, stock_count, publisher, language, cover_image_url } = book;
    const query = `
        UPDATE Books 
        SET title = ?, author = ?, genre = ?, publish_date = ?, isbn = ?, price = ?, stock_count = ?, publisher = ?, language = ?, cover_image_url = ?
        WHERE id = ?
    `;
    const values = [title, author, genre, publish_date, isbn, price, stock_count, publisher, language, cover_image_url, id];
    
    try {
        await pool.execute(query, values);
    } catch (err) {
        throw new Error('Failed to update book: ' + err.message);
    }
}

// Delete book by ID
async function deleteBook(id) {
    const query = 'DELETE FROM Books WHERE id = ?';
    try {
        await pool.execute(query, [id]);
    } catch (err) {
        throw new Error('Failed to delete book: ' + err.message);
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
