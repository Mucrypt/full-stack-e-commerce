import React from 'react';
import CANCELIMAGE from '../assest/cancel.gif';
import { Link } from 'react-router-dom';

const CancelPayment = () => {
  return (
    <div 
      className="w-full max-w-md mx-auto flex flex-col items-center p-6 rounded-lg shadow-lg"
      style={{
        backgroundColor: `var(--color-background)`,
        color: `var(--color-text)`,
      }}
    >
      <img 
        src={CANCELIMAGE} 
        alt="Payment Canceled" 
        width={150} 
        height={150} 
        className="mb-4"
      />
      <p className="text-2xl font-semibold mb-2 text-red-600">
        Payment Canceled
      </p>
      <p className="text-center text-sm text-gray-500 mb-4">
        Your payment was canceled. You can review your items in the cart and try again.
      </p>
      <Link 
        to="/Cart"
        className="mt-5 px-4 py-2 rounded-full transition-all transform hover:bg-red-600 hover:text-white hover:scale-105"
        style={{
          border: `2px solid red`, 
          color: 'red',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}
      >
        Return to Cart
      </Link>
    </div>
  );
};

export default CancelPayment;
