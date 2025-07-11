
"use client";

import React, { useState } from 'react';
import TabPersonal from 'views/apps/AdvisorProfile';  // Adjust the path to where your TabPersonal component is located

const ProfilePage = () => {

  return (
    <div>
      {/* Only show ListTime component */}
      <TabPersonal />
    </div>
  );
};

export default ProfilePage;

/*"use client";

import React, { useState } from 'react';
import TabPersonal from 'views/apps/AdvisorProfile';  // Adjust the path to where your TabPersonal component is located
//import WorkScheduleForm from 'views/apps/AdvisorProfileTime';  // Adjust the path for this as well
import ListTime from 'views/apps/ListTime';
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal"); // Manage active tab state
  const [refreshList, setRefreshList] = useState<boolean>(false);

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex flex-wrap sm:flex-nowrap space-x-4 sm:space-x-6 border-b-2 border-gray-300 mb-6">
        <button
          onClick={() => handleTabClick("personal")}
          className={`px-4 py-2 text-lg font-semibold ${activeTab === "personal" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Personal Info
        </button>
        <button
          onClick={() => handleTabClick("schedule")}
          className={`px-4 py-2 text-lg font-semibold ${activeTab === "schedule" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Work Schedule
        </button>
      </div>

      {activeTab === "personal" && <TabPersonal />}
      {activeTab === "schedule" && <ListTime refresh={refreshList}/>}
    </div>
  );
};

export default ProfilePage;
*/