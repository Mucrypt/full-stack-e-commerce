import React from 'react';

const Logo = ({ w, h }) => {
  return (
    <svg width={w} height={h} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Circle element for main logo background */}
      <circle cx="50" cy="50" r="48" fill="#292929" stroke="#fff" strokeWidth="2" />
      
      {/* Inner circular element to add depth */}
      <circle cx="50" cy="50" r="38" fill="#fff" stroke="#292929" strokeWidth="2" />
      
      {/* Text element for logo initials or brand */}
      <text x="50%" y="50%" textAnchor="middle" fill="#292929" fontSize="24" fontWeight="bold" dy=".3em">
        LOGO
      </text>
    </svg>
  );
};

export default Logo;
