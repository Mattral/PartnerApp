"use client"
// PROJECT IMPORTS
import DashboardAnalytics from 'views/dashboard/DashboardAnalytics';
import Welcome from 'views/apps/Welcome';
import { useState, useEffect } from 'react';

const Analytics = () => {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

  useEffect(() => {
    // Show the welcome popup when the component mounts
    setIsWelcomeOpen(true);

    // Optionally, you can add a timeout or condition to hide the popup after a certain time.
    // For example, automatically close the welcome popup after 5 seconds.
    setTimeout(() => {
      setIsWelcomeOpen(false);
    }, 10000); // Popup will close after 10 seconds
  }, []);
  //{isWelcomeOpen && <Welcome />}

  return (
    <>
      {/* Render Welcome popup if isWelcomeOpen is true */}
      <Welcome />
      
      {/* Analytics dashboard content */}
      <DashboardAnalytics />
    </>
  );
};

export default Analytics;

/*"use client";

// PROJECT IMPORTS
import DashboardDefault from 'views/dashboard/DashboardDefault';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Dashboard = () => {
  return <DashboardDefault />;
};

export default Dashboard;

*/