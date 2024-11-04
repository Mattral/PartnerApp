"use client";
// PROJECT IMPORTS
import React, { useState } from 'react';
import Products from 'views/apps/Products';
import WebPageRenderer from 'views/ZoomCall/WebPageRenderer';

// ==============================|| DASHBOARD WITH WEB RENDER ||============================== //

const Dashboard = () => {
  const [url, setUrl] = useState(""); // State to hold the meeting link
  const [scale, setScale] = useState(0.8); // Default scale

  const handleUrlChange = (e) => {
    setUrl(e.target.value); // Update the URL state
  };

  const handleSubmit = () => {
    // Handle any submit actions here if needed
    // For now, it simply renders the WebPageRenderer when the Submit button is clicked
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2)); // Limit max scale to 2
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5)); // Limit min scale to 0.5
  };

  return (
    <div className="flex flex-col items-center text-center p-4">
      <Products />
      {/* Form to enter meeting link */}
      <div className="mt-5 flex flex-col md:flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Enter meeting link"
          value={url}
          onChange={handleUrlChange}
          className="p-2 w-full md:w-1/3 border border-gray-300 rounded mb-3 md:mb-0 md:mr-3" // Responsive input field
        />
        <button 
          onClick={handleSubmit} 
          className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      {/* Render Web Page only if URL is provided */}
      {url && (
        <WebPageRenderer url={url} scale={scale} />
      )}
      {/* Zoom Controls */}
      <div className="flex justify-center gap-4 mt-5">
        <button 
          onClick={zoomOut} 
          className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-600"
        >
          Zoom Out
        </button>
        <button 
          onClick={zoomIn} 
          className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-600"
        >
          Zoom In
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
