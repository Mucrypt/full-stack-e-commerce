import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import AdminBooksCard from '../components/AdminBooksCard'; // The new card component for displaying books
import UploadBook from '../components/UploadBook';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [openUploadBook, setOpenUploadBook] = useState(false);

  const fetchAllBooks = async () => {
    try {
      const response = await fetch(SummaryApi.getAllBooks.url);
      const dataResponse = await response.json();
      setBooks(dataResponse || []);  // Ensure the data is properly set
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchAllBooks();  // Fetch books when component is mounted
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Books</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
         onClick={() => setOpenUploadBook(true)}>
          Upload Book
        </button>
      </div>

      <div className='flex items-start  flex-wrap gap-3 py-2 h-[calc(100vh-190px)] overflow-y-scroll'>
        {books.length > 0 ? (
          books.map((book, index) => (
            <AdminBooksCard data={book} key={index + "allBooks"} fetchdata={fetchAllBooks} />
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>

       {/**upload Books component */}
       {
          openUploadBook && (
            <UploadBook onClose={()=>setOpenUploadBook(false)} fetchData={fetchAllBooks}/>
          )
        }



    </div>
  );
};

export default AllBooks;
