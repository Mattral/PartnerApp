import React from 'react';
import TabPersonal from 'views/apps/AdvisorProfile';  // Adjust the path to where your TabPersonal component is located
import WorkScheduleForm from 'views/apps/AdvisorProfileTime';

const ProfilePage = () => {
  return (
    <div>
      <TabPersonal />  {/* Use the imported component here */}
      <WorkScheduleForm/>
    </div>
  );
};

export default ProfilePage;
