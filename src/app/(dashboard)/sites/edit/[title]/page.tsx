"use client"; // This makes the component a Client Component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardDefault from 'views/dashboard/DynamicRoute';

// Define the type for the configuration object
interface Config {
  headerText?: string;
  footerText?: string;
  // Add other fields as needed
}

const EditPage = () => {
  const { title } = useParams(); // Get dynamic route parameter
  
  const [config, setConfig] = useState<Config | null>(null); // Initialize with null
  const [loading, setLoading] = useState(true);

  // Fetch the site's configuration when the page loads
  useEffect(() => {
    if (title) {
      fetch(`/api/sites/${title}`)
        .then(response => response.json())
        .then(data => {
          setConfig(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching configuration:', error);
          // Inject dummy data for testing
          setConfig({ headerText: 'Default Header', footerText: 'Default Footer' });
          setLoading(false);
        });
    } else {
      // Inject dummy data if title is not provided
      setConfig({ headerText: 'Default Header', footerText: 'Default Footer' });
      setLoading(false);
    }
  }, [title]);

  if (loading) return <div>Loading...</div>;

  // Save the site's configuration
  const handleSave = async () => {
    if (config) {
      const response = await fetch(`/api/sites/${title}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        alert('Configuration saved!');
      } else {
        alert('Failed to save configuration.');
      }
    }
  };

  return (
    <div>
      <h1>Edit Site: {title || 'Default Site'}</h1>
      
      {/* Editable form to change configuration */}
      <div>
        <label>Header Text</label>
        <input
          type="text"
          value={config?.headerText || ""}
          onChange={(e) => setConfig({ ...config, headerText: e.target.value })}
        />

        <label>Footer Text</label>
        <input
          type="text"
          value={config?.footerText || ""}
          onChange={(e) => setConfig({ ...config, footerText: e.target.value })}
        />

        {/* Add more fields for layout, theme, etc. */}
      </div>

      <button onClick={handleSave}>Save Configuration</button>
      {/* Ensure DashboardDefault accepts the config prop */}
      <DashboardDefault/>
    </div>
  );
};

export default EditPage;

//  <DashboardDefault config={config} />