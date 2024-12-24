"use client"
import React from 'react';
import { useAdvisorData } from './useAdvisorData';  // Import the custom hook

const AdvisorFetcher = () => {
  const advisors = useAdvisorData();  // Fetch the data using the hook

  // Render the JSON data
  return (
    <div>
      <h1>Advisor Data (JSON format)</h1>
      <pre>{JSON.stringify(advisors, null, 2)}</pre>
    </div>
  );
};

export default AdvisorFetcher;
