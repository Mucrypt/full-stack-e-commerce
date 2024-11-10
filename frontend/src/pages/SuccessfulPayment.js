import React from 'react';
import SUCCESSIMAGE from '../assest/success.gif';
import { Link } from 'react-router-dom';

const SuccessfulPayment = () => {
  return (
    <div 
      className="w-full max-w-lg mx-auto flex flex-col items-center p-8 rounded-lg shadow-xl"
      style={{
        backgroundColor: `var(--color-background)`,
        color: `var(--color-text)`,
        maxHeight: '80vh', // Set a max height for the entire component
        overflowY: 'auto', // Enable vertical scroll
      }}
    >
      <img 
        src={SUCCESSIMAGE} 
        alt="Payment Successful" 
        width={160} 
        height={160} 
        className="mb-5 animate-bounce"
      />
      <p className="text-2xl font-bold mb-2 text-green-600 text-center">
        Thank You for Your Purchase!
      </p>
      <p className="text-center text-gray-600 mb-4">
        Your payment was successful, and your order is now being processed. You can track your order details on the orders page.
      </p>
      <Link 
        to="/order"
        className="mt-6 px-5 py-2 rounded-full transition-all transform hover:bg-green-600 hover:text-white hover:scale-105"
        style={{
          border: `2px solid green`,
          color: 'green',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}
      >
        View Your Orders
      </Link>
      <Link
        to="/shop"
        className="mt-4 px-5 py-2 rounded-full transition-all transform hover:bg-blue-600 hover:text-white hover:scale-105"
        style={{
          border: `2px solid blue`,
          color: 'blue',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
