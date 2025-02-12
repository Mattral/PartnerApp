"use client";

import React, { useState } from 'react';
import ListTime from 'views/apps/ListTime';

const ProfilePage = () => {
  const [refreshList, setRefreshList] = useState<boolean>(false);

  return (
    <div>
      {/* Only show ListTime component */}
      <ListTime refresh={refreshList} />
    </div>
  );
};

export default ProfilePage;
