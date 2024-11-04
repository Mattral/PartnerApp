"use client"; // This makes the component a Client Component

import DashboardDefault from 'views/dashboard/DynamicRoute';

const EditPage = () => {

  return (
      <DashboardDefault/>
  );
};

export default EditPage;

//  <DashboardDefault config={config} />

/*
// PROJECT IMPORTS
import StickyActionBarPage from 'views/forms-tables/forms/layout/ClientVOI';

// ==============================|| LAYOUTS - STICKY ACTION BAR ||============================== //

function StickyActionBar() {
  return <StickyActionBarPage />;
}

export default StickyActionBar;
*/