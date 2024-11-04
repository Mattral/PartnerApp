"use client";
import React, { useState } from 'react';
import WebPageRenderer from 'views/ZoomCall/WebPageRenderer';

const AddNewProductPage = () => {
  const [scale, setScale] = useState(0.8); // Default scale

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2)); // Limit max scale to 2
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5)); // Limit min scale to 0.5
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">Session</h1>
      <WebPageRenderer url="https://next-js-zoom-two.vercel.app/" scale={scale} />

      {/* Zoom Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button onClick={zoomOut} style={buttonStyle}>Zoom Out</button>
        <button onClick={zoomIn} style={buttonStyle}>Zoom In</button>
      </div>
    </div>
  );
};

// Button styles
const buttonStyle = {
  padding: '8px 15px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.2s',
};

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 640px) {
    h1 {
      font-size: 1.5rem; // Adjust heading size for small screens
    }
    button {
      padding: 6px 10px; // Smaller padding on buttons for small screens
      font-size: 0.875rem; // Smaller font size for buttons
    }
  }
  @media (min-width: 640px) {
    h1 {
      font-size: 2rem; // Adjust heading size for medium screens
    }
  }
`;

export default AddNewProductPage;


/*
// PROJECT IMPORTS
import Products from 'views/apps/Products';

// ==============================|| ECOMMERCE - PRODUCTS ||============================== //

const ProductsPage = () => {
  return <Products />;
};

export default ProductsPage;
*/