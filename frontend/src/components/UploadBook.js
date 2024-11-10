import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { MdCloudUpload } from "react-icons/md";
import uploadImage from '../helpers/uploadImage'; // If you want to upload a cover image to cloudinary
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DisplayImage from '../components/DisplayImage';




const UploadBook = ({
   onClose,
   fetchData
}) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    publish_date: '',
    isbn: '',
    price: '',
    stock_count: '',
    publisher: '',
    language: 'English',
    cover_image_url: [] // Store the book cover image
  });

  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreen, setOpenFullScreen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadBookImage = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setBookData(prev => ({
      ...prev,
      cover_image_url: [...prev.cover_image_url, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteBookImage = async (index) => {
    const newBookImage = [...bookData.cover_image_url];
    newBookImage.splice(index, 1);
    setBookData(prev => ({
      ...prev,
      cover_image_url: [...newBookImage]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadBook.url, {
      method: SummaryApi.uploadBook.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(bookData)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Book</h2>
          <div className='w-fit ml-auto text-2xl cursor-pointer hover:text-red-500' onClick={onClose}>
            <IoCloseSharp />
          </div>
        </div>
        <form className='p-4 grid gap-4 overflow-y-scroll h-full pb-20' onSubmit={handleSubmit}>
          {/* Book Title */}
          <label htmlFor='title'>Book Title :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            name='title'
            type='text'
            required
            id='title'
            placeholder='Enter book title'
            value={bookData.title}
            onChange={handleChange}
          />

          {/* Author */}
          <label htmlFor='author'>Author :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            name='author'
            required
            type='text'
            id='author'
            placeholder='Enter author name'
            value={bookData.author}
            onChange={handleChange}
          />

          {/* Genre */}
          <label htmlFor='genre'>Genre :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            name='genre'
            required
            type='text'
            id='genre'
            placeholder='Enter genre'
            value={bookData.genre}
            onChange={handleChange}
          />

          {/* Publish Date */}
          <label htmlFor='publish_date'>Publish Date :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            name='publish_date'
            type='date'
            id='publish_date'
            value={bookData.publish_date}
            onChange={handleChange}
          />

          {/* ISBN */}
          <label htmlFor='isbn'>ISBN :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            name='isbn'
            type='text'
            required
            id='isbn'
            placeholder='Enter ISBN'
            value={bookData.isbn}
            onChange={handleChange}
          />

          {/* Cover Image Upload */}
          <label htmlFor='cover_image_url'>Cover Image :</label>
          <label htmlFor='UploadBookImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex flex-col justify-center items-center cursor-pointer hover:bg-slate-50 transition'>
              <MdCloudUpload className='text-4xl text-slate-500' />
              <p className='text-sm text-slate-500'>Upload Book Cover Image</p>
              <input
                type='file'
                id='UploadBookImageInput'
                className='hidden'
                onChange={handleUploadBookImage}
              />
            </div>
          </label>

          {/* Image Preview */}
          <div>
            {bookData?.cover_image_url[0] ? (
              <div className='flex items-center gap-2'>
                {bookData.cover_image_url.map((el, index) => {
                  return (
                    <div className='relative group' key={index}>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className='bg-slate-100 border cursor-pointer'
                        onClick={() => {
                          setFullScreenImage(el);
                          setOpenFullScreen(true);
                        }}
                      />
                      <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteBookImage(index)}>
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload book cover image</p>
            )}
          </div>

          {/* Price */}
          <label htmlFor='price'>Price :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='number'
            id='price'
            required
            name='price'
            placeholder='Enter price'
            value={bookData.price}
            onChange={handleChange}
          />

          {/* Stock Count */}
          <label htmlFor='stock_count'>Stock Count :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='number'
            id='stock_count'
            required
            name='stock_count'
            placeholder='Enter stock count'
            value={bookData.stock_count}
            onChange={handleChange}
          />

          {/* Publisher */}
          <label htmlFor='publisher'>Publisher :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            name='publisher'
            required
            type='text'
            id='publisher'
            placeholder='Enter publisher name'
            value={bookData.publisher}
            onChange={handleChange}
          />

          <button className='px-3 py-1 bg-red-500 text-white hover:bg-red-700'>
            Upload Book
          </button>
        </form>

        {/* Display image on full screen */}
        {openFullScreen && (
          <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreen(false)} />
        )}
      </div>
    </div>
  );
};

export default UploadBook;
