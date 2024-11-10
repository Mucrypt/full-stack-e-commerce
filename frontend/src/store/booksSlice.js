import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        updateBook: (state, action) => {
            const index = state.books.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
    },
});

export const { setBooks, addBook, updateBook, deleteBook } = booksSlice.actions;

export default booksSlice.reducer;
