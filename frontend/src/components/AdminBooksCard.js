import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";

const AdminBooksCard = ({ data, fetchdata }) => {
  const [editBook, setEditBook] = useState(false);

  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-40'>
        {/* Image section */}
        <div className='w-32 h-32 flex justify-center items-center'>
          <img 
            src={data?.cover_image_url || '/default-cover.jpg'}  // Fallback if no cover image
            alt={data?.title || 'Book Cover'}
            className='mx-auto object-fill h-full' 
          />
        </div>
        
        {/* Display book details */}
        <h1 className='text-ellipsis line-clamp-2'>{data.title}</h1>
        <p>Author: {data.author}</p>
        <p>Genre: {data.genre}</p>
        <p>ISBN: {data.isbn}</p>
        <p>Price: ${data.price}</p>
        <p>Stock Count: {data.stock_count}</p>

        <div>
          {/* Edit button */}
          <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' 
               onClick={() => setEditBook(true)}>
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {/* Edit book modal */}
      {editBook && (
        <div>
          {/* Add the edit book modal here */}
          <button onClick={() => setEditBook(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AdminBooksCard;
