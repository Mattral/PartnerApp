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
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">Zoom Preview</h1>
      <WebPageRenderer url="https://zoom-test-nine.vercel.app" scale={scale} />

      {/* Zoom Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button onClick={zoomOut} className={buttonClasses}>Zoom Out</button>
        <button onClick={zoomIn} className={buttonClasses}>Zoom In</button>
      </div>
    </div>
  );
};

// Button styles using Tailwind CSS
const buttonClasses = "px-4 py-2 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-600";

export default AddNewProductPage;





/*
// PROJECT IMPORTS
//import AddNewProduct from 'views/apps/AddNewProduct';
import dynamic from "next/dynamic";

const PreviewContainer = dynamic(() => import("feature/preview/preview").then(mod => mod.default), {
  ssr: false,
});

//import PreviewContainer from 'feature/preview/preview'

// ==============================|| ECOMMERCE - ADD PRODUCT ||============================== //

function AddNewProductPage() {
  return <PreviewContainer />;
}

export default AddNewProductPage;
*/