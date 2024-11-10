//frontend/src/components/UploadProducts.js

import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import productCategory from '../helpers/productCategory';
import { MdCloudUpload } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
   onClose ,
   fetchData
  }) => {
  const [productData, setProductData] = useState({
    productName: '',
    brandName: '',
    category: '',
    description: '',
    price: '',
   // countInStock: '',
    sellingPrice: '',  // Corrected typo in sellingPrice
    productImage: [] // Updated to handle image file
  });

  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreen, setOpenFullScreen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setProductData(prev => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...productData.productImage];
    newProductImage.splice(index, 1);
    setProductData(prev => ({
      ...prev,
      productImage: [...newProductImage]
    }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    const response = await fetch(SummaryApi.uploadProduct.url,{
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(productData)
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchData()
        
    }


    if(responseData.error){
      toast.error(responseData?.message)
    }
  

  }

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Products</h2>
          <div className='w-fit ml-auto text-2xl cursor-pointer hover:text-red-500' onClick={onClose}>
            <IoCloseSharp />
          </div>
        </div>
        <form className='p-4 grid gap-4 overflow-y-scroll h-full pb-20' onSubmit={handleSubmit}>
          {/* Product Name */}
          <label htmlFor='productName'>Product Name :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            name='productName'
            type='text'
            required
            id='productName'
            placeholder='Enter product name'
            value={productData.productName}
            onChange={handleChange}
          />

          {/* Brand Name */}
          <label htmlFor='brandName'>Brand Name :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            name='brandName'
            required
            type='text'
            id='brandName'
            placeholder='Enter brand name'
            value={productData.brandName}
            onChange={handleChange}
          />

          {/* Category */}
          <label htmlFor='category'>Category :</label>
          <select
           required
            className="p-2 bg-slate-100 border rounded"
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            {productCategory.map((el, index) => (
              <option key={el.value + index} value={el.value}>{el.label}</option>
            ))}
          </select>

          {/* Product Image Upload */}
          <label htmlFor='productImage'>Product Image :</label>
          <label htmlFor='UploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex flex-col justify-center items-center cursor-pointer hover:bg-slate-50 transition'>
              <MdCloudUpload className='text-4xl text-slate-500' />
              <p className='text-sm text-slate-500'>Upload Product Image</p>
              <input
                type='file'
                id='UploadImageInput'
               
                className='hidden'
                onChange={handleUploadProduct}
                
              />
            </div>
          </label>

          {/* Image Preview */}
          <div>
            {productData?.productImage[0] ? (
              <div className='flex items-center gap-2'>
                {productData.productImage.map((el, index) => {
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
                      <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload product image</p>
            )}
          </div>

          {/* Product Price */}
          <label htmlFor='price'>Product Price :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='number'
            id='price'
            required
            name='price'
            placeholder='Enter price'
            value={productData.price}
            onChange={handleChange}
          />

          {/* Selling Price */}
          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input
            type='number'
            id='sellingPrice'
            placeholder='Enter selling price'
            value={productData.sellingPrice}
            name='sellingPrice'
            onChange={handleChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          {/* Description */}
          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea
            className='h-28 bg-slate-100 border resize-none p-1'
            placeholder='Enter product description'
            required
            rows={3}
            onChange={handleChange}
            name='description'
            value={productData.description}
          >
          </textarea>

          <button className='px-3 py-1 bg-red-500 text-white hover:bg-red-700'>
            Upload Product
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

export default UploadProduct;
