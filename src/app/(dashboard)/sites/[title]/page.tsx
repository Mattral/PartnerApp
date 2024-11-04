"use client";
// Import the default dashboard content
import DashboardDefault from 'views/dashboard/DynamicRoute';
import { useParams } from 'next/navigation';

// ==============================|| DYNAMIC EDIT PAGE ||============================== //

const EditPage = () => {
  // Use useParams to access the dynamic title
  const { title } = useParams(); 

  return (
    <div>
      <h1>Edit Site: {title}</h1> {/* Display the dynamic title */}
      <DashboardDefault /> {/* Reuse the dashboard content */}
    </div>
  );
};

export default EditPage;
